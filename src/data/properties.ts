export interface Property {
  id: string
  slug: string
  name: string
  location: string
  city: string
  state: string
  country: string
  price: string
  priceValue: number
  type: string
  beds: number
  baths: number
  sqft: number
  lotSize: string
  yearBuilt: number
  featured: boolean
  description: string
  features: string[]
  amenities: string[]
  images: string[]
  agent: {
    name: string
    role: string
    phone: string
    email: string
    image: string
  }
}

// Valid Unsplash photo IDs for luxury architecture
const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

// Architecture image pool
const ARCH = [
  '1512917774080-9991f1c4c750', // white/grey concrete building near pool
  '1505843513577-22bb7d21e455', // white/black lighted concrete house (dusk)
  '1613977257363-707ba9348227', // modern white villa with pool
  '1706808849780-7a04fbac83ef', // modern house with pool and lounge chairs
  '1580587771525-78b9dba3b914', // white/brown concrete building
  '1613490493576-7fde63acd811', // white/brown concrete building
  '1593714604578-d9e41b00c6c6', // white/brown concrete building near pool
  '1591474200742-8e512e6f98f8', // white/brown wooden house
  '1564078516393-cf04bd966897', // interior - chaise couch
  '1486406146926-c627a92ad1ab', // architecture
  '1600596542815-ffad4c1539a9', // white concrete building
  '1670589953882-b94c9cb380f5', // building with pool
  '1777115470242-9b21d2c67729', // modern two-story house
  '1531971589569-0d9370cbe1e5', // building at dusk
]

// Portrait pool
const PORTRAIT = [
  '1507003211169-0a1dd7228f2d', // man
  '1494790108377-be9c29b29330', // woman
  '1500648767791-00dcc994a43e', // man
  '1438761681033-6461ffad8d80', // woman
]

function gallery(seed: number): string[] {
  // Pick 5 images from the pool, starting at different offsets for variety
  const result: string[] = []
  for (let i = 0; i < 5; i++) {
    result.push(img(ARCH[(seed + i) % ARCH.length]))
  }
  return result
}

export const properties: Property[] = [
  {
    id: '1',
    slug: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: '$2.35 Million',
    priceValue: 2350000,
    type: 'Villa',
    beds: 4,
    baths: 3,
    sqft: 4200,
    lotSize: '0.8 acres',
    yearBuilt: 2021,
    featured: true,
    description:
      'A stunning architectural masterpiece set on the shores of Lake Austin. This modern villa features floor-to-ceiling glass walls that dissolve the boundary between interior and landscape, an infinity-edge pool that appears to merge with the lake, and meticulously curated living spaces designed for both grand entertaining and intimate living.',
    features: [
      'Floor-to-ceiling glass walls',
      'Infinity-edge pool with lake views',
      'Smart home automation',
      'Chef\'s kitchen with Wolf appliances',
      'Private dock',
      'Wine cellar',
    ],
    amenities: [
      'Infinity Pool',
      'Private Dock',
      'Wine Cellar',
      'Home Theater',
      '3-Car Garage',
      'Landscaped Gardens',
    ],
    images: gallery(0),
    agent: {
      name: 'Daniel Morgan',
      role: 'Managing Director',
      phone: '(555) 246-7890',
      email: 'daniel@horizonproperties.com',
      image: img(PORTRAIT[0], 400),
    },
  },
  {
    id: '2',
    slug: 'pacific-glass-house',
    name: 'Pacific Glass House',
    location: 'Malibu, California, USA',
    city: 'Malibu',
    state: 'California',
    country: 'USA',
    price: '$4.8 Million',
    priceValue: 4800000,
    type: 'Modern Home',
    beds: 5,
    baths: 4,
    sqft: 5800,
    lotSize: '1.2 acres',
    yearBuilt: 2022,
    featured: true,
    description:
      'Perched above the Pacific Ocean, this architectural gem embodies the essence of California modernism. Expansive glass panels frame uninterrupted ocean views, while warm wood accents and natural stone create a serene, grounded atmosphere. The home flows seamlessly from interior to exterior living spaces.',
    features: [
      'Uninterrupted ocean views',
      'Cantilevered design',
      'Heated infinity pool',
      'Outdoor kitchen and dining',
      'Primary suite with ocean vista',
      'Solar power system',
    ],
    amenities: [
      'Heated Infinity Pool',
      'Outdoor Kitchen',
      'Solar Power',
      'Smart Climate Control',
      'Private Path to Beach',
      '2-Car Garage',
    ],
    images: gallery(2),
    agent: {
      name: 'Olivia Carter',
      role: 'Luxury Property Advisor',
      phone: '(555) 246-7891',
      email: 'olivia@horizonproperties.com',
      image: img(PORTRAIT[1], 400),
    },
  },
  {
    id: '3',
    slug: 'desert-horizon-estate',
    name: 'Desert Horizon Estate',
    location: 'Scottsdale, Arizona, USA',
    city: 'Scottsdale',
    state: 'Arizona',
    country: 'USA',
    price: '$3.15 Million',
    priceValue: 3150000,
    type: 'Estate',
    beds: 4,
    baths: 4,
    sqft: 4500,
    lotSize: '2.5 acres',
    yearBuilt: 2020,
    featured: true,
    description:
      'A desert modernist retreat that harmonizes with its arid landscape. Rammed earth walls, steel shading devices, and native plantings create a home that is both grounded and airy. The estate captures mountain views from every principal room.',
    features: [
      'Rammed earth walls',
      'Mountain views from every room',
      'Desert landscaping',
      'Reflecting pool',
      'Outdoor lounge with fireplace',
      'Guest casita',
    ],
    amenities: [
      'Reflecting Pool',
      'Guest Casita',
      'Outdoor Fireplace',
      'Native Desert Garden',
      '3-Car Garage',
      'Smart Home System',
    ],
    images: gallery(4),
    agent: {
      name: 'James Wilson',
      role: 'Investment Consultant',
      phone: '(555) 246-7892',
      email: 'james@horizonproperties.com',
      image: img(PORTRAIT[2], 400),
    },
  },
  {
    id: '4',
    slug: 'oceanfront-residence',
    name: 'Oceanfront Residence',
    location: 'Miami, Florida, USA',
    city: 'Miami',
    state: 'Florida',
    country: 'USA',
    price: '$5.2 Million',
    priceValue: 5200000,
    type: 'Waterfront',
    beds: 6,
    baths: 5,
    sqft: 7200,
    lotSize: '0.5 acres',
    yearBuilt: 2023,
    featured: true,
    description:
      'A bold waterfront statement on Biscayne Bay. This residence combines polished concrete, bronze detailing, and panoramic glazing to create a sophisticated waterfront lifestyle. A deep-water dock accommodates a large vessel, and the rooftop terrace offers 360-degree water and skyline views.',
    features: [
      'Deep-water dock',
      'Rooftop terrace with skyline views',
      'Bronze and concrete architecture',
      'Summer kitchen',
      'Elevator to all floors',
      'Hurricane-rated impact glass',
    ],
    amenities: [
      'Deep-Water Dock',
      'Rooftop Terrace',
      'Elevator',
      'Summer Kitchen',
      'Wine Room',
      '4-Car Garage',
    ],
    images: gallery(6),
    agent: {
      name: 'Sophia Bennett',
      role: 'Senior Property Specialist',
      phone: '(555) 246-7893',
      email: 'sophia@horizonproperties.com',
      image: img(PORTRAIT[3], 400),
    },
  },
  {
    id: '5',
    slug: 'modern-hillside-retreat',
    name: 'Modern Hillside Retreat',
    location: 'Los Angeles, California, USA',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    price: '$3.75 Million',
    priceValue: 3750000,
    type: 'Modern Home',
    beds: 4,
    baths: 3,
    sqft: 3800,
    lotSize: '0.6 acres',
    yearBuilt: 2021,
    featured: false,
    description:
      'Cascading down a Hollywood Hills slope, this retreat uses terraced architecture to create layered outdoor living spaces. Each level opens to a different vista of the city below. The design balances raw concrete with warm oak and brass.',
    features: [
      'Terraced outdoor living',
      'City and ocean views',
      'Vanishing-edge pool',
      'Glass-floor wine display',
      'Home gym',
      '2-car subterranean garage',
    ],
    amenities: [
      'Vanishing-Edge Pool',
      'Home Gym',
      'Wine Display',
      'Smart Lighting',
      'Outdoor Lounge',
      '2-Car Garage',
    ],
    images: gallery(8),
    agent: {
      name: 'Olivia Carter',
      role: 'Luxury Property Advisor',
      phone: '(555) 246-7891',
      email: 'olivia@horizonproperties.com',
      image: img(PORTRAIT[1], 400),
    },
  },
  {
    id: '6',
    slug: 'palm-garden-residence',
    name: 'Palm Garden Residence',
    location: 'Beverly Hills, California, USA',
    city: 'Beverly Hills',
    state: 'California',
    country: 'USA',
    price: '$6.4 Million',
    priceValue: 6400000,
    type: 'Estate',
    beds: 7,
    baths: 6,
    sqft: 9500,
    lotSize: '1.5 acres',
    yearBuilt: 2022,
    featured: false,
    description:
      'A grand estate hidden behind mature palms in the heart of Beverly Hills. The residence centers on a resort-style courtyard with pool, spa, and pavilion. Interiors feature bespoke millwork, imported stone, and a primary suite that rivals a five-star suite.',
    features: [
      'Resort-style courtyard',
      'Pool, spa, and pavilion',
      'Bespoke millwork',
      'Primary suite with dual dressing rooms',
      'Screening room',
      'Subterranean garage for 6 cars',
    ],
    amenities: [
      'Resort Pool & Spa',
      'Screening Room',
      '6-Car Garage',
      'Gated Entry',
      'Staff Quarters',
      'Gardens by Landscape Architect',
    ],
    images: gallery(10),
    agent: {
      name: 'Daniel Morgan',
      role: 'Managing Director',
      phone: '(555) 246-7890',
      email: 'daniel@horizonproperties.com',
      image: img(PORTRAIT[0], 400),
    },
  },
  {
    id: '7',
    slug: 'contemporary-lake-house',
    name: 'Contemporary Lake House',
    location: 'Lake Tahoe, Nevada, USA',
    city: 'Lake Tahoe',
    state: 'Nevada',
    country: 'USA',
    price: '$2.95 Million',
    priceValue: 2950000,
    type: 'Lakefront',
    beds: 4,
    baths: 3,
    sqft: 3600,
    lotSize: '0.4 acres',
    yearBuilt: 2019,
    featured: false,
    description:
      'A refined lakefront home that embraces its alpine setting. Cedar siding, stone chimneys, and oversized glazing frame the ever-changing surface of Lake Tahoe. The great room features a double-height stone fireplace and walls of glass opening to the dock.',
    features: [
      'Lakefront with private dock',
      'Double-height stone fireplace',
      'Cedar and stone exterior',
      'Heated driveway and walkways',
      'Boathouse',
      'Ski room',
    ],
    amenities: [
      'Private Dock',
      'Boathouse',
      'Heated Driveway',
      'Ski Room',
      'Stone Fireplace',
      '2-Car Garage',
    ],
    images: gallery(1),
    agent: {
      name: 'James Wilson',
      role: 'Investment Consultant',
      phone: '(555) 246-7892',
      email: 'james@horizonproperties.com',
      image: img(PORTRAIT[2], 400),
    },
  },
  {
    id: '8',
    slug: 'architectural-downtown-penthouse',
    name: 'Architectural Downtown Penthouse',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: '$1.85 Million',
    priceValue: 1850000,
    type: 'Penthouse',
    beds: 3,
    baths: 2,
    sqft: 2800,
    lotSize: 'N/A',
    yearBuilt: 2023,
    featured: false,
    description:
      'A full-floor penthouse atop one of Austin\'s most architecturally significant towers. The open plan is wrapped in floor-to-ceiling glass with panoramic views of the city and hill country. Finishes include white oak floors, Italian cabinetry, and a wraparound terrace.',
    features: [
      'Full-floor penthouse',
      '360-degree city views',
      'Wraparound terrace',
      'White oak floors throughout',
      'Italian designer kitchen',
      'Concierge service',
    ],
    amenities: [
      'Wraparound Terrace',
      'Concierge Service',
      'Fitness Center',
      'Rooftop Pool',
      'Private Storage',
      '2 Reserved Parking Spaces',
    ],
    images: gallery(3),
    agent: {
      name: 'Sophia Bennett',
      role: 'Senior Property Specialist',
      phone: '(555) 246-7893',
      email: 'sophia@horizonproperties.com',
      image: img(PORTRAIT[3], 400),
    },
  },
]

export const propertyTypes = ['All', 'Villa', 'Modern Home', 'Estate', 'Waterfront', 'Lakefront', 'Penthouse']
export const locations = ['All', 'Austin', 'Malibu', 'Scottsdale', 'Miami', 'Los Angeles', 'Beverly Hills', 'Lake Tahoe']
export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'beds-desc', label: 'Most Bedrooms' },
]

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function getSimilarProperties(property: Property, count = 3): Property[] {
  return properties
    .filter((p) => p.id !== property.id)
    .sort((a, b) => {
      const aMatch = (a.city === property.city ? 1 : 0) + (a.type === property.type ? 1 : 0)
      const bMatch = (b.city === property.city ? 1 : 0) + (b.type === property.type ? 1 : 0)
      return bMatch - aMatch
    })
    .slice(0, count)
}
