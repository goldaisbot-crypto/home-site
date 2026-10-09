import { Link } from 'react-router-dom'
import { MapPin, BedDouble, Bath, Maximize, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Property } from '../data/properties'
import { useFavorites } from '../hooks/useFavorites'

interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'featured'
  index?: number
}

export default function PropertyCard({ property, variant = 'default', index = 0 }: PropertyCardProps) {
  const { isFavorite, toggle } = useFavorites()
  const fav = isFavorite(property.id)

  if (variant === 'featured') {
    return (
      <Link
        to={`/properties/${property.slug}`}
        className="group relative block flex-shrink-0 overflow-hidden rounded-2xl bg-navy"
        style={{ width: 'min(560px, 80vw)' }}
        aria-label={`View ${property.name}`}
      >
        <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.name}
            loading={index < 2 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(property.id) }}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${fav ? 'fill-champagne text-champagne' : 'text-white'}`}
            strokeWidth={1.5}
          />
        </button>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5">{property.name}</h3>
              <p className="flex items-center gap-1.5 text-sm text-white/70">
                <MapPin className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} />
                {property.location}
              </p>
            </div>
            <p className="text-lg md:text-xl font-bold text-champagne whitespace-nowrap">{property.price}</p>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/15">
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <BedDouble className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.beds} Beds
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Bath className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.baths} Baths
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Maximize className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <Link
        to={`/properties/${property.slug}`}
        className="group block overflow-hidden rounded-2xl bg-paper transition-shadow duration-500 hover:shadow-xl hover:shadow-navy/5"
        aria-label={`View ${property.name}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-navy tracking-wide">
            {property.type}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); toggle(property.id) }}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${fav ? 'fill-champagne text-champagne' : 'text-white'}`}
              strokeWidth={1.5}
            />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-bold text-navy group-hover:text-champagne transition-colors">
              {property.name}
            </h3>
            <p className="text-base font-bold text-champagne whitespace-nowrap">{property.price}</p>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-muted mb-4">
            <MapPin className="w-3.5 h-3.5 text-champagne" strokeWidth={1.5} />
            {property.location}
          </p>
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <BedDouble className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.beds}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <Bath className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.baths}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <Maximize className="w-3.5 h-3.5" strokeWidth={1.5} /> {property.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
