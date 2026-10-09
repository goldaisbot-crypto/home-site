export interface Service {
  id: string
  title: string
  description: string
  image: string
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`

export const services: Service[] = [
  {
    id: '1',
    title: 'Luxury Home Sales',
    description:
      'Curated representation of exceptional properties, connecting discerning sellers with qualified buyers through targeted marketing and global reach.',
    image: img('1512917774080-9991f1c4c750'),
  },
  {
    id: '2',
    title: 'Property Investment',
    description:
      'Strategic acquisition guidance backed by market intelligence, yield analysis, and long-term portfolio planning for residential and mixed-use assets.',
    image: img('1706808849780-7a04fbac83ef'),
  },
  {
    id: '3',
    title: 'Property Marketing',
    description:
      'Editorial-grade photography, cinematic video, and bespoke campaigns that position each property as a singular opportunity in the market.',
    image: img('1613977257363-707ba9348227'),
  },
  {
    id: '4',
    title: 'Real Estate Advisory',
    description:
      'Confidential counsel on acquisitions, dispositions, and market timing—grounded in data and decades of transactional expertise.',
    image: img('1613490493576-7fde63acd811'),
  },
  {
    id: '5',
    title: 'Property Valuation',
    description:
      'Precise, defensible appraisals informed by comparable sales, replacement cost, and income approach methodologies.',
    image: img('1580587771525-78b9dba3b914'),
  },
  {
    id: '6',
    title: 'Relocation Services',
    description:
      'End-to-end relocation support—from neighborhood discovery and school research to move coordination and settling-in services.',
    image: img('1593714604578-d9e41b00c6c6'),
  },
]

export interface WhyChooseItem {
  id: string
  title: string
  description: string
}

export const whyChooseItems: WhyChooseItem[] = [
  {
    id: '1',
    title: 'Curated Portfolio',
    description: 'Every property in our portfolio is hand-selected for architectural merit, location, and long-term value.',
  },
  {
    id: '2',
    title: 'Global Network',
    description: 'Our relationships span private collectors, investment funds, and international buyers across three continents.',
  },
  {
    id: '3',
    title: 'Data-Driven Insight',
    description: 'Decisions backed by proprietary market intelligence, yield modeling, and decades of transactional data.',
  },
  {
    id: '4',
    title: 'Discretion & Trust',
    description: 'Confidential representation with the highest standards of privacy, from first viewing to final close.',
  },
]
