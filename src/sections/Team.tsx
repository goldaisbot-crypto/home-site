import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin } from 'lucide-react'
import { teamMembers } from '../data/team'

export default function Team() {
  return (
    <section id="team" className="section-padding bg-ivory">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ transformPerspective: 1000 }}
          className="text-center mb-14"
        >
          <span className="label-gold mb-3 block">Our Team</span>
          <h2 className="heading-section">Meet the Experts</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ transformPerspective: 1000 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Social links on hover */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-navy hover:bg-champagne transition-colors"
                  >
                    <Mail className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    aria-label={`Call ${member.name}`}
                    className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-navy hover:bg-champagne transition-colors"
                  >
                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    aria-label={`${member.name} on LinkedIn`}
                    className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-navy hover:bg-champagne transition-colors"
                  >
                    <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
              <h3 className="text-lg font-bold text-navy text-center">{member.name}</h3>
              <p className="text-sm text-champagne text-center mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
