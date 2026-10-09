import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * useSmoothScroll
 * ---------------
 * Initialises Lenis for buttery-smooth inertial scrolling across the site.
 * Respects prefers-reduced-motion (falls back to native scrolling).
 * Automatically stops/starts when a full-screen overlay (mobile menu, gallery)
 * sets body overflow:hidden, so the background never scrolls behind a modal.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Pause Lenis when body overflow is hidden (mobile menu / fullscreen gallery)
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') {
        lenis.stop()
      } else {
        lenis.start()
      }
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      lenis.destroy()
    }
  }, [])
}
