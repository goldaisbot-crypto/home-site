import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PropertyCard from '../components/PropertyCard'
import { properties, propertyTypes, locations, sortOptions } from '../data/properties'

export default function Properties() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [location, setLocation] = useState('All')
  const [minBeds, setMinBeds] = useState(0)
  const [minBaths, setMinBaths] = useState(0)
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high' | 'ultra'>('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase()))
        return false
      if (type !== 'All' && p.type !== type) return false
      if (location !== 'All' && p.city !== location) return false
      if (p.beds < minBeds) return false
      if (p.baths < minBaths) return false
      if (priceRange === 'low' && p.priceValue > 3000000) return false
      if (priceRange === 'mid' && (p.priceValue < 3000000 || p.priceValue > 4500000)) return false
      if (priceRange === 'high' && (p.priceValue < 4500000 || p.priceValue > 5500000)) return false
      if (priceRange === 'ultra' && p.priceValue < 5500000) return false
      return true
    })

    switch (sortBy) {
      case 'price-asc': result = [...result].sort((a, b) => a.priceValue - b.priceValue); break
      case 'price-desc': result = [...result].sort((a, b) => b.priceValue - a.priceValue); break
      case 'beds-desc': result = [...result].sort((a, b) => b.beds - a.beds); break
      default: result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return result
  }, [search, type, location, minBeds, minBaths, priceRange, sortBy])

  const resetFilters = () => {
    setSearch('')
    setType('All')
    setLocation('All')
    setMinBeds(0)
    setMinBaths(0)
    setPriceRange('all')
    setSortBy('featured')
  }

  const hasActiveFilters = search || type !== 'All' || location !== 'All' || minBeds > 0 || minBaths > 0 || priceRange !== 'all'

  return (
    <div className="pt-16 md:pt-20">
      {/* Page header */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="container-luxury text-center">
          <span className="label-gold mb-3 block">Browse</span>
          <h1 className="text-section-title font-bold text-white mb-4">Find Your Property</h1>
          <p className="text-base text-white/60 max-w-xl mx-auto">
            Explore our curated collection of exceptional homes and investment opportunities.
          </p>
        </div>
      </section>

      {/* Search & filter bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-paper/95 backdrop-blur-md border-b border-gray-100">
        <div className="container-luxury py-4">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or location..."
                aria-label="Search properties"
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-champagne/50 transition-colors"
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-navy text-white border-navy'
                  : 'border-gray-200 text-navy hover:border-champagne'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
              )}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort properties"
              className="px-4 py-2.5 rounded-full border border-gray-200 text-sm text-navy focus:outline-none focus:border-champagne/50 transition-colors cursor-pointer bg-paper"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Expandable filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-5 pb-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Type */}
                  <div>
                    <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-champagne/50 bg-paper cursor-pointer"
                    >
                      {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  {/* Location */}
                  <div>
                    <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Location</label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-champagne/50 bg-paper cursor-pointer"
                    >
                      {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  {/* Bedrooms */}
                  <div>
                    <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Min Beds</label>
                    <select
                      value={minBeds}
                      onChange={(e) => setMinBeds(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-champagne/50 bg-paper cursor-pointer"
                    >
                      <option value={0}>Any</option>
                      <option value={2}>2+</option>
                      <option value={3}>3+</option>
                      <option value={4}>4+</option>
                      <option value={5}>5+</option>
                    </select>
                  </div>
                  {/* Bathrooms */}
                  <div>
                    <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Min Baths</label>
                    <select
                      value={minBaths}
                      onChange={(e) => setMinBaths(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-champagne/50 bg-paper cursor-pointer"
                    >
                      <option value={0}>Any</option>
                      <option value={2}>2+</option>
                      <option value={3}>3+</option>
                      <option value={4}>4+</option>
                    </select>
                  </div>
                  {/* Price range */}
                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className="text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">Price Range</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: 'all', label: 'All Prices' },
                        { val: 'low', label: 'Under $3M' },
                        { val: 'mid', label: '$3M – $4.5M' },
                        { val: 'high', label: '$4.5M – $5.5M' },
                        { val: 'ultra', label: '$5.5M+' },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => setPriceRange(opt.val as typeof priceRange)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            priceRange === opt.val
                              ? 'bg-navy text-white'
                              : 'bg-gray-100 text-muted hover:bg-gray-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-champagne hover:text-champagne-dark transition-colors"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          <p className="text-sm text-muted mb-8">
            Showing <span className="font-semibold text-navy">{filtered.length}</span> {filtered.length === 1 ? 'property' : 'properties'}
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted mb-4">No properties match your filters.</p>
              <button
                onClick={resetFilters}
                className="text-sm font-semibold text-champagne hover:text-champagne-dark transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
