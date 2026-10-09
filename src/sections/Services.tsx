import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="section-padding bg-paper">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ transformPerspective: 1000 }}
          className="max-w-2xl mb-14"
        >
          <span className="label-gold mb-3 block">Our Services</span>
          <h2 className="heading-section mb-4">Comprehensive Real Estate Expertise</h2>
          <p className="body-text">
            From acquisition to closing, we provide end-to-end service tailored to the
            needs of luxury homeowners and investors alike.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              style={{ transformPerspective: 1000 }}
              className="group relative bg-paper p-8 lg:p-10 transition-colors duration-500 hover:bg-ivory cursor-pointer"
            >
              {/* Number */}
              <span className="text-xs font-semibold text-champagne tracking-[0.2em] mb-6 block">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Image */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors duration-500" />
              </div>

              <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-champagne transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{service.description}</p>

              <ArrowUpRight
                className="w-5 h-5 text-champagne mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
