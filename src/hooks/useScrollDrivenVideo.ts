import { useRef, useState, useEffect } from 'react'

/**
 * useScrollDrivenVideo
 * --------------------
 * Maps the user's vertical scroll position to a <video> element's currentTime,
 * creating a premium scroll-driven cinematic experience.
 *
 * The video is NEVER played (no video.play()). We scrub the timeline by
 * writing video.currentTime directly, synced to requestAnimationFrame.
 *
 * Architecture:
 *   scroll event (passive) → compute target time → rAF loop → smooth
 *   interpolation → seek video only when delta exceeds one frame.
 *
 * This avoids re-rendering React on every scroll event; all updates go
 * through refs and direct DOM manipulation.
 *
 * --- Encoding notes for smooth random-access seeking ---
 * The supplied video should ideally be:
 *   - H.264 (avc1) MP4 with `+faststart` so the moov atom is at the front
 *     (enables progressive download / immediate metadata).
 *   - Frequent keyframes (every 1-2s) so seeking doesn't decode long GOPs.
 *   - Moderate bitrate (2-6 Mbps for 1080p) — high enough for quality, low
 *     enough for fast decode.
 *   - 1080p or below; 4K will stutter on mid-range mobile devices.
 *   - A WebM/VP9 alternate source can be offered via <source> for browsers
 *     that seek WebM more efficiently, but H.264 MP4 is the safest default.
 */

// Smoothing factor for interpolation (0-1). Higher = more responsive, lower = smoother.
// 0.15 converges ~96% within 20 frames (~0.33s at 60fps) — smooth yet responsive.
const SMOOTHING = 0.15

// Only seek the video when the interpolated time has moved by at least this much.
// ~16ms ≈ one frame at 60fps. Prevents seek flooding while staying smooth.
const SEEK_THRESHOLD = 0.016

// When the remaining delta is below this, snap to target and stop the rAF loop.
const STOP_THRESHOLD = 0.002

export interface ScrollDrivenVideoResult {
  containerRef: React.RefObject<HTMLElement>
  videoRef: React.RefObject<HTMLVideoElement>
  textRef: React.RefObject<HTMLDivElement>
  isReady: boolean
  hasError: boolean
}

export function useScrollDrivenVideo(enabled: boolean): ScrollDrivenVideoResult {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Mutable animation state — kept in refs to avoid React re-renders.
  const targetTimeRef = useRef(0)
  const currentTimeRef = useRef(0)
  const lastSetTimeRef = useRef(0)
  const durationRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const tickingRef = useRef(false)

  // ---- Phase 1: Video preloading & readiness ----
  useEffect(() => {
    if (!enabled) return
    const video = videoRef.current
    if (!video) return

    const onLoadedData = () => {
      durationRef.current = video.duration || 0
      setIsReady(true)
    }
    const onLoadedMetadata = () => {
      durationRef.current = video.duration || 0
    }
    const onError = () => setHasError(true)

    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('error', onError)

    // If the video was already cached, readyState may be >= 2 on mount.
    if (video.readyState >= 2) {
      durationRef.current = video.duration || 0
      setIsReady(true)
    }

    return () => {
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('error', onError)
    }
  }, [enabled])

  // ---- Phase 2: Scroll-driven scrubbing ----
  useEffect(() => {
    if (!enabled || !isReady || hasError) return

    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const duration = durationRef.current
    if (!duration || !isFinite(duration)) return

    // Compute target video time from the container's scroll position.
    // Called from the passive scroll listener — must be cheap (no seeks here).
    const computeTarget = () => {
      const rect = container.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) {
        targetTimeRef.current = 0
        return
      }
      // progress: 0 when section top is at viewport top → 1 when section bottom meets viewport bottom.
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      targetTimeRef.current = progress * duration
    }

    // The rAF loop: smooth-interpolate currentTime toward target, seek when needed.
    const animate = () => {
      const target = targetTimeRef.current
      const current = currentTimeRef.current
      const delta = target - current

      // Update text fade based on target progress (no layout read — uses cached duration).
      if (textRef.current) {
        const progress = duration > 0 ? target / duration : 0
        // Fade text out over the first 20% of the scroll, with a subtle upward drift.
        const fade = Math.max(0, 1 - progress * 5)
        textRef.current.style.opacity = String(fade)
        textRef.current.style.transform = `translate3d(0, ${progress * -30}px, 0)`
      }

      // Converged — snap to exact target and stop the loop.
      if (Math.abs(delta) < STOP_THRESHOLD) {
        currentTimeRef.current = target
        if (Math.abs(video.currentTime - target) > 0.01) {
          video.currentTime = target
          lastSetTimeRef.current = target
        }
        tickingRef.current = false
        return
      }

      // Exponential smoothing toward the target.
      currentTimeRef.current = current + delta * SMOOTHING

      // Only seek when we've moved at least one frame since the last seek.
      if (Math.abs(currentTimeRef.current - lastSetTimeRef.current) > SEEK_THRESHOLD) {
        video.currentTime = currentTimeRef.current
        lastSetTimeRef.current = currentTimeRef.current
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // Passive scroll handler — only computes the target, then kicks off rAF if idle.
    const onScroll = () => {
      computeTarget()
      if (!tickingRef.current) {
        tickingRef.current = true
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // Initialise: place the video at the frame matching the current scroll position.
    computeTarget()
    currentTimeRef.current = targetTimeRef.current
    video.currentTime = targetTimeRef.current
    lastSetTimeRef.current = targetTimeRef.current

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      tickingRef.current = false
    }
  }, [enabled, isReady, hasError])

  return { containerRef, videoRef, textRef, isReady, hasError }
}
