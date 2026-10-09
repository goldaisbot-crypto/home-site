import { motion } from 'framer-motion'
import { whyChooseItems } from '../data/services'

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-navy text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-champagne blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-champagne blur-[60px]" />
      </div>

      <div className="container-luxury relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            style={{ transformPerspective: 1000 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <span className="label-gold mb-4 block">Why Horizon</span>
            <h2 className="text-section-title font-bold text-white mb-6">
              A Standard Above<br /> the Ordinary
            </h2>
            <p className="text-base leading-relaxed text-white/60 max-w-md">
              We don't just sell properties. We curate opportunities, build relationships,
              and deliver results that endure well beyond the closing table.
            </p>
          </motion.div>

          {/* Right: items */}
          <div className="space-y-px">
            {whyChooseItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30, rotateY: 10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{ transformPerspective: 1000 }}
                className="group py-8 border-t border-white/10 first:border-t-0"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs font-semibold text-champagne tracking-[0.2em] flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-champagne transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
