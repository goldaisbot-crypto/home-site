import { useParams, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, BedDouble, Bath, Maximize, Calendar, Home as HomeIcon,
  Heart, Phone, Mail, ArrowRight, Check, ChevronRight,
} from 'lucide-react'
import ImageGallery from '../components/ImageGallery'
import PropertyCard from '../components/PropertyCard'
import { getPropertyBySlug, getSimilarProperties } from '../data/properties'
import { useFavorites } from '../hooks/useFavorites'

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const property = slug ? getPropertyBySlug(slug) : undefined
  const { isFavorite, toggle } = useFavorites()
  const [showContactForm, setShowContactForm] = useState(false)
  const [formSent, setFormSent] = useState(false)

  if (!property) return <Navigate to="/properties" replace />

  const fav = isFavorite(property.id)
  const similar = getSimilarProperties(property)

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
    setTimeout(() => { setFormSent(false); setShowContactForm(false) }, 2500)
  }

  const specs = [
    { icon: HomeIcon, label: 'Property Type', value: property.type },
    { icon: BedDouble, label: 'Bedrooms', value: property.beds },
    { icon: Bath, label: 'Bathrooms', value: property.baths },
    { icon: Maximize, label: 'Square Feet', value: property.sqft.toLocaleString() },
    { icon: Calendar, label: 'Year Built', value: property.yearBuilt },
    { icon: MapPin, label: 'Lot Size', value: property.lotSize },
  ]

  return (
    <div className="pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="bg-paper border-b border-gray-100">
        <div className="container-luxury py-4">
          <nav className="flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-champagne transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            <Link to="/properties" className="hover:text-champagne transition-colors">Properties</Link>
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-navy font-medium truncate">{property.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <section className="section-padding bg-paper">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Left: Gallery + details */}
            <div className="lg:col-span-2">
              <ImageGallery images={property.images} alt={property.name} />

              {/* Title + price (mobile) */}
              <div className="lg:hidden mt-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-navy mb-2">{property.name}</h1>
                    <p className="flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="w-4 h-4 text-champagne" strokeWidth={1.5} />
                      {property.location}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-champagne whitespace-nowrap">{property.price}</p>
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden mt-8 border border-gray-100">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-paper p-5 text-center">
                    <spec.icon className="w-5 h-5 text-champagne mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-xs text-muted uppercase tracking-wide mb-1">{spec.label}</p>
                    <p className="text-sm font-semibold text-navy">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-navy mb-4">About This Property</h2>
                <p className="body-text">{property.description}</p>
              </div>

              {/* Key features */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-navy mb-5">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-champagne" strokeWidth={2} />
                      </span>
                      <span className="text-sm text-graphite">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-navy mb-5">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-4 py-2 rounded-full bg-ivory text-sm text-navy border border-gray-100"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sticky info panel */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32">
                {/* Title + price (desktop) */}
                <div className="hidden lg:block mb-6">
                  <h1 className="text-3xl font-bold text-navy mb-2">{property.name}</h1>
                  <p className="flex items-center gap-1.5 text-sm text-muted mb-4">
                    <MapPin className="w-4 h-4 text-champagne" strokeWidth={1.5} />
                    {property.location}
                  </p>
                  <p className="text-2xl font-bold text-champagne">{property.price}</p>
                </div>

                {/* Favorite button */}
                <button
                  onClick={() => toggle(property.id)}
                  className={`w-full mb-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    fav
                      ? 'bg-champagne/10 text-champagne border border-champagne/30'
                      : 'bg-transparent text-navy border border-gray-200 hover:border-champagne'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${fav ? 'fill-champagne' : ''}`} strokeWidth={1.5} />
                  {fav ? 'Saved to Favorites' : 'Save to Favorites'}
                </button>

                {/* Agent card */}
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="bg-navy p-6 text-center">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      loading="lazy"
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-champagne/30"
                    />
                    <h3 className="text-base font-bold text-white">{property.agent.name}</h3>
                    <p className="text-sm text-champagne">{property.agent.role}</p>
                  </div>
                  <div className="p-6 bg-paper space-y-3">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center gap-3 text-sm text-navy hover:text-champagne transition-colors"
                    >
                      <Phone className="w-4 h-4 text-champagne" strokeWidth={1.5} />
                      {property.agent.phone}
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center gap-3 text-sm text-navy hover:text-champagne transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-champagne" strokeWidth={1.5} />
                      {property.agent.email}
                    </a>
                  </div>
                  <div className="p-6 pt-0 space-y-3">
                    <button
                      onClick={() => setShowContactForm(!showContactForm)}
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-all duration-300"
                    >
                      Contact Agent
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => setShowContactForm(!showContactForm)}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-navy/15 text-navy text-sm font-semibold hover:border-champagne hover:text-champagne transition-all duration-300"
                    >
                      Schedule a Viewing
                    </button>
                  </div>
                </div>

                {/* Contact form */}
                {showContactForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onSubmit={handleContact}
                    className="mt-4 p-6 rounded-2xl border border-gray-100 space-y-3"
                  >
                    {formSent ? (
                      <p className="text-center text-sm text-champagne py-4">
                        ✓ Thank you! We'll be in touch shortly.
                      </p>
                    ) : (
                      <>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          aria-label="Your name"
                          className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-champagne/50"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          aria-label="Your email"
                          className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-champagne/50"
                        />
                        <input
                          type="text"
                          placeholder="Preferred Date"
                          aria-label="Preferred viewing date"
                          className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-champagne/50"
                        />
                        <textarea
                          placeholder="Message"
                          rows={3}
                          aria-label="Message"
                          className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-champagne/50 resize-none"
                        />
                        <button
                          type="submit"
                          className="w-full px-6 py-3 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors"
                        >
                          Send Request
                        </button>
                      </>
                    )}
                  </motion.form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar properties */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="label-gold mb-3 block">More Properties</span>
            <h2 className="heading-section">Similar Properties</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile floating CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-gray-100 p-4 flex gap-3">
        <button
          onClick={() => toggle(property.id)}
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border transition-all ${
            fav ? 'bg-champagne/10 text-champagne border-champagne/30' : 'border-gray-200 text-navy'
          }`}
          aria-label="Toggle favorite"
        >
          <Heart className={`w-5 h-5 ${fav ? 'fill-champagne' : ''}`} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => setShowContactForm(true)}
          className="flex-1 px-6 py-3 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors"
        >
          Contact Agent
        </button>
      </div>
    </div>
  )
}
