export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  phone: string
  email: string
}

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop`

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    image: portrait('1507003211169-0a1dd7228f2d'),
    phone: '(555) 246-7890',
    email: 'daniel@horizonproperties.com',
  },
  {
    id: '2',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    image: portrait('1494790108377-be9c29b29330'),
    phone: '(555) 246-7891',
    email: 'olivia@horizonproperties.com',
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Investment Consultant',
    image: portrait('1500648767791-00dcc994a43e'),
    phone: '(555) 246-7892',
    email: 'james@horizonproperties.com',
  },
  {
    id: '4',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    image: portrait('1438761681033-6461ffad8d80'),
    phone: '(555) 246-7893',
    email: 'sophia@horizonproperties.com',
  },
]
