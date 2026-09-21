import { Link, useParams, Navigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'
import ProjectArt from '../components/ProjectArt'
import ArchitectureFlow from '../components/ArchitectureFlow'
import Seo from '../components/Seo'
import { projects } from '../data/projects'
import { architecture } from '../data/architecture'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const index = projects.findIndex((p) => p.slug === slug)

  if (!project) return <Navigate to="/projects" replace />

  const next = projects[(index + 1) % projects.length]

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-28">
      <Seo
        title={project.name}
        description={project.summary}
        path={`/projects/${project.slug}`}
      />
      <Reveal>
        <Link to="/projects" className="text-sm text-muted hover:text-ink mb-8 inline-block">
          ← All projects
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <ProjectArt slug={project.slug} number={project.number} name={project.name} className="h-64 md:h-80 mb-10" />
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-sm text-muted2 mb-4">Case study {project.number}</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4">{project.name}</h1>
        <p className="text-muted mb-2">{project.role}</p>
        <p className="text-muted2 text-sm">{project.year}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-sm text-muted2 mb-3 font-medium">The problem</h2>
            <p className="text-ink leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <h2 className="text-sm text-muted2 mb-3 font-medium">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span key={t} className="text-xs border border-line rounded-full px-3 py-1.5 text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <h2 className="text-sm text-muted2 mb-5 font-medium">What was built</h2>
        <ul className="space-y-4 mb-12">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-4 text-ink border-b border-line pb-4">
              <span className="text-violet mt-1">—</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {architecture[project.slug] && (
        <Reveal delay={0.18} className="mb-20">
          <ArchitectureFlow steps={architecture[project.slug]} />
        </Reveal>
      )}

      <Reveal delay={0.2} className="border-t border-line pt-12 flex items-center justify-between flex-wrap gap-6">
        <div>
          <p className="text-sm text-muted2 mb-2">Next case study</p>
          <Link to={`/projects/${next.slug}`} className="font-display text-2xl font-semibold hover:text-violet transition-colors">
            {next.name} →
          </Link>
        </div>
        <MagneticButton to="/contact" variant="ghost">Discuss a project →</MagneticButton>
      </Reveal>
    </div>
  )
}
