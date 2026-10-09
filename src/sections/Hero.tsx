import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useScrollDrivenVideo } from '../hooks/useScrollDrivenVideo'

// Scroll distance for the hero experience. 300vh = 2 viewport heights of
// scroll travel (section is 300vh, sticky viewport is 100vh).
// Adjust up/down if the video feels too fast or too slow.
const HERO_SCROLL_HEIGHT = 'h-[300vh]'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=2000&q=85&auto=format&fit=crop'

export default function Hero() {
  // Respect prefers-reduced-motion: show a static image hero instead.
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const useVideo = !reducedMotion
  const { containerRef, videoRef, textRef, isReady, hasError } =
    useScrollDrivenVideo(useVideo)

  // When video is active and ready, it covers the image. Otherwise the image shows.
  const showVideo = useVideo && !hasError
  const videoVisible = showVideo && isReady

  return (
    <section
      ref={showVideo ? containerRef : undefined}
      className={`relative w-full ${showVideo ? HERO_SCROLL_HEIGHT : 'h-screen min-h-[640px]'}`}
    >
      {/* Sticky viewport — stays pinned while the user scrolls through the section */}
      <div className="sticky top-0 h-screen min-h-[640px] w-full overflow-hidden">
        {/* --- Fallback image (always rendered as the base layer) --- */}
        <img
          src={FALLBACK_IMAGE}
          alt="Modern glass villa at dusk with infinity pool reflecting the evening sky"
          className="absolute inset-0 w-full h-full object-cover"
          // @ts-ignore - fetchpriority is valid HTML but React doesn't type it
          fetchpriority="high"
        />

        {/* --- Scroll-driven video (on top, crossfades in when ready) --- */}
        {showVideo && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/*
              H.264 MP4 — best browser-wide seeking support.
              To add a WebM alternate for browsers that seek it faster:
              <source src="/videos/hero.webm" type="video/webm" />
            */}
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* --- Subtle overlay for text readability (not heavy) --- */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/15 to-navy/40" />

        {/* --- Loading indicator (minimal, premium) --- */}
        {showVideo && !isReady && !hasError && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="h-px w-16 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-1/2 animate-[shimmer_1.4s_ease-in-out_infinite] bg-champagne" />
            </div>
          </div>
        )}

        {/* --- Hero content (fades out as the user scrolls) --- */}
        <div
          ref={textRef}
          className="relative h-full flex flex-col items-center justify-center px-6 text-center will-change-[opacity,transform]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-gold mb-6 block">Horizon Properties</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-hero font-bold text-white max-w-4xl text-balance"
            style={{ textShadow: '0 2px 24px rgba(10, 25, 47, 0.45)' }}
          >
            Discover Exceptional<br /> Homes &amp; Investments
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed"
            style={{ textShadow: '0 1px 12px rgba(10, 25, 47, 0.5)' }}
          >
            Premium properties in prime locations. Find your dream home<br className="hidden sm:block" />
            or the perfect investment with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-navy text-sm font-semibold tracking-wide hover:bg-champagne hover:text-navy transition-all duration-300"
            >
              Explore Properties
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
            <Link
              to="/#about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/40 text-white text-sm font-semibold tracking-wide hover:border-champagne hover:text-champagne transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* --- Scroll indicator --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
