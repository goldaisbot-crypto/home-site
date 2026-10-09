import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-paper">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-surface px-8 md:px-14 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-10"
        >
          {/* Key icon */}
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-navy flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="#C5A059" strokeWidth="1.5" />
              <path d="M16 16L26 26" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 22L25 19" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M24 24L27 21" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="11" cy="11" r="2.5" stroke="#C5A059" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-base text-muted">
              Let our experts guide you to the right home or investment.
            </p>
          </div>

          {/* Button */}
          <Link
            to="/#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-navy text-white text-sm font-semibold tracking-wide hover:bg-navy-light transition-all duration-300 flex-shrink-0"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
