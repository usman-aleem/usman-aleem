export type Project = {
  slug: string
  number: string
  name: string
  role: string
  year: string
  summary: string
  problem: string
  stack: string[]
  highlights: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'crochet-by-urooj',
    number: '01',
    name: 'Project 1',
    role: 'Solo developer — Flutter',
    year: '2026',
    featured: true,
    summary: 'Case study coming soon — full write-up in progress.',
    problem: 'Details coming soon.',
    stack: ['Flutter', 'Firebase'],
    highlights: ['Full case study being finalized — check back soon.'],
  },
  {
    slug: 'azu-wears',
    number: '02',
    name: 'Project 2',
    role: 'Solo developer — Flutter',
    year: '2026',
    summary: 'Case study coming soon — full write-up in progress.',
    problem: 'Details coming soon.',
    stack: ['Flutter', 'Firebase'],
    highlights: ['Full case study being finalized — check back soon.'],
  },
  {
    slug: 'sakinah',
    number: '03',
    name: 'Project 3',
    role: 'Solo developer — Flutter',
    year: '2026',
    summary: 'Case study coming soon — full write-up in progress.',
    problem: 'Details coming soon.',
    stack: ['Flutter'],
    highlights: ['Full case study being finalized — check back soon.'],
  },
  {
    slug: 'younas-sweet-bakers',
    number: '04',
    name: 'Project 4',
    role: 'Solo developer — Flutter',
    year: 'In progress',
    summary: 'Case study coming soon — full write-up in progress.',
    problem: 'Details coming soon.',
    stack: ['Flutter', 'FastAPI', 'PostgreSQL'],
    highlights: ['Full case study being finalized — check back soon.'],
  },
]
