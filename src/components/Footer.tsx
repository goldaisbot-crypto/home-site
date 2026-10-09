import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import Logo from './Logo'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Team', to: '/#team' },
  { label: 'Contact', to: '/#contact' },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo light />
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Connecting people with extraordinary homes and smart investments. Integrity,
              transparency, and client satisfaction at the heart of everything we do.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-champagne hover:border-champagne/50 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-champagne transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 mt-0.5 text-champagne flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+15552467890" className="hover:text-champagne transition-colors">
                  (555) 246-7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 mt-0.5 text-champagne flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:hello@horizonproperties.com" className="hover:text-champagne transition-colors">
                  hello@horizonproperties.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 text-champagne flex-shrink-0" strokeWidth={1.5} />
                <span>
                  1200 Architectural Blvd,<br />Suite 500, Austin, TX 78701
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne mb-5">
              Newsletter
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Subscribe for exclusive property listings and market insights.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email for newsletter"
                className="w-full pl-4 pr-12 py-3 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-champagne/50 transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-champagne text-navy flex items-center justify-center hover:bg-champagne-light transition-colors"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-champagne mt-2 animate-fade-in">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Horizon Properties. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-champagne transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-champagne transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
