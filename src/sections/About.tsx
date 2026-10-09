import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section id="about" className="section-padding bg-paper">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-gold mb-4 block">About Us</span>
            <h2 className="heading-section mb-6">Who We Are</h2>
            <p className="body-text mb-8 max-w-lg">
              At Horizon Properties, we connect people with extraordinary homes and smart
              investments. Integrity, transparency, and client satisfaction are at the heart
              of everything we do.
            </p>
            <p className="body-text mb-10 max-w-lg">
              Our team brings decades of experience across luxury residential sales,
              investment advisory, and property marketing—guiding each client with
              precision and discretion.
            </p>
            <Link
              to="/#services"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-navy text-white text-sm font-semibold tracking-wide hover:bg-navy-light transition-all duration-300"
            >
              Learn More
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </motion.div>

          {/* Right: Image composition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-5 gap-4">
              {/* Main image */}
              <div className="col-span-4 relative overflow-hidden rounded-2xl aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop"
                  alt="Luxury modern home with pool, architectural photography"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
              </div>
              {/* Secondary image */}
              <div className="col-span-2 relative overflow-hidden rounded-2xl aspect-[3/5] group mt-8">
                <img
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80&auto=format&fit=crop"
                  alt="Modern glass architecture detail"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                {/* Circular arrow button */}
                <button
                  aria-label="View more images"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-navy hover:bg-champagne hover:text-navy transition-all duration-300 group-hover:scale-110"
                >
                  <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-champagne/20 rounded-2xl -z-10 hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
