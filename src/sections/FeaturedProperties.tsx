import { motion } from 'framer-motion'
import PropertyCarousel from '../components/PropertyCarousel'
import { properties } from '../data/properties'

export default function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured)
  const all = [...featured, ...properties.filter((p) => !p.featured)]

  return (
    <section id="featured" className="section-padding bg-ivory">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ transformPerspective: 1000 }}
          className="text-center mb-12"
        >
          <span className="label-gold mb-3 block">Featured</span>
          <h2 className="heading-section">Featured Properties</h2>
        </motion.div>
      </div>

      {/* Carousel extends to the right edge */}
      <div className="pl-6 md:pl-10 lg:pl-16">
        <PropertyCarousel properties={all} />
      </div>
    </section>
  )
}
