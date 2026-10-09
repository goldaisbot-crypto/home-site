import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Team', to: '/#team' },
  { label: 'Contact', to: '/#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isTransparent = isHome && !scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-navy/95 backdrop-blur-xl shadow-lg shadow-navy/10 border-b border-champagne/20'
        }`}
      >
        <nav className="container-luxury flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Horizon Properties home">
            <Logo light={isTransparent || true} />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive =
                (link.to === '/' && isHome) ||
                (link.to === '/properties' && location.pathname.startsWith('/properties'))
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                      isTransparent ? 'text-white/90 hover:text-white' : 'text-white/80 hover:text-white'
                    } ${isActive ? 'text-white' : ''}`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-champagne transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Phone CTA */}
          <a
            href="tel:+15552467890"
            className={`hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium tracking-wide border transition-all duration-300 ${
              isTransparent
                ? 'border-white/40 text-white hover:border-champagne hover:text-champagne'
                : 'border-white/30 text-white hover:border-champagne hover:text-champagne'
            }`}
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
            (555) 246-7890
          </a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-1.5"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-navy" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-navy flex flex-col"
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
                <Logo light />
                <button
                  className="text-white p-1.5"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-6 py-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className="block py-3 text-xl font-light text-white/90 hover:text-champagne transition-colors border-b border-white/5"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="px-6 mt-auto pb-8">
                <a
                  href="tel:+15552467890"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-champagne/40 text-champagne hover:bg-champagne hover:text-navy transition-all duration-300"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  (555) 246-7890
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
