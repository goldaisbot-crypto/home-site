interface LogoProps {
  light?: boolean
}

export default function Logo({ light = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Geometric building icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Left building */}
        <rect x="3" y="11" width="7" height="14" stroke="#C5A059" strokeWidth="1.2" />
        {/* Right building (taller) */}
        <rect x="13" y="6" width="9" height="19" stroke="#C5A059" strokeWidth="1.2" />
        {/* Windows left */}
        <line x1="5.5" y1="14" x2="7.5" y2="14" stroke="#C5A059" strokeWidth="0.8" />
        <line x1="5.5" y1="17" x2="7.5" y2="17" stroke="#C5A059" strokeWidth="0.8" />
        <line x1="5.5" y1="20" x2="7.5" y2="20" stroke="#C5A059" strokeWidth="0.8" />
        {/* Windows right */}
        <line x1="15.5" y1="9" x2="19.5" y2="9" stroke="#C5A059" strokeWidth="0.8" />
        <line x1="15.5" y1="12" x2="19.5" y2="12" stroke="#C5A059" strokeWidth="0.8" />
        <line x1="15.5" y1="15" x2="19.5" y2="15" stroke="#C5A059" strokeWidth="0.8" />
        <line x1="15.5" y1="18" x2="19.5" y2="18" stroke="#C5A059" strokeWidth="0.8" />
        <line x1="15.5" y1="21" x2="19.5" y2="21" stroke="#C5A059" strokeWidth="0.8" />
      </svg>
      <span className={`text-base font-bold tracking-wider ${light ? 'text-white' : 'text-navy'}`}>
        HORIZON<span className="text-champagne ml-1.5">PROPERTIES</span>
      </span>
    </div>
  )
}
