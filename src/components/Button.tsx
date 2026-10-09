import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { type ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'outline-light' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white hover:bg-navy-light border border-navy',
  outline:
    'bg-transparent text-navy border border-navy/20 hover:border-champagne hover:text-champagne',
  'outline-light':
    'bg-transparent text-white border border-white/40 hover:border-champagne hover:text-champagne',
  ghost:
    'bg-transparent text-navy hover:text-champagne border border-transparent',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 ease-out ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={`group ${base}`} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={`group ${base}`} aria-label={ariaLabel}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`group ${base}`} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
