import { useRef, useCallback, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyCard from './PropertyCard'
import type { Property } from '../data/properties'

interface PropertyCarouselProps {
  properties: Property[]
}

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const dragState = useRef({ startX: 0, scrollLeft: 0, hasMoved: false })

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    updateScrollButtons()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [updateScrollButtons])

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    dragState.current = {
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      hasMoved: false,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const el = scrollRef.current
    if (!el) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = x - dragState.current.startX
    if (Math.abs(walk) > 5) dragState.current.hasMoved = true
    el.scrollLeft = dragState.current.scrollLeft - walk
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative">
      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => scrollByAmount(-420)}
          disabled={!canScrollLeft}
          aria-label="Previous properties"
          className="w-11 h-11 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:bg-navy hover:text-white hover:border-navy transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-navy disabled:hover:border-navy/15"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => scrollByAmount(420)}
          disabled={!canScrollRight}
          aria-label="Next properties"
          className="w-11 h-11 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:bg-navy hover:text-white hover:border-navy transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-navy disabled:hover:border-navy/15"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className={`flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 ${
          isDragging ? 'dragging' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        aria-label="Property gallery"
        aria-live="polite"
      >
        {properties.map((property, i) => (
          <div key={property.id} className="snap-start">
            <PropertyCard property={property} variant={i === 0 ? 'featured' : 'default'} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}
