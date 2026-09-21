import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ProjectArt from '../components/ProjectArt'
import Seo from '../components/Seo'
import { projects } from '../data/projects'

export default function Projects() {
  const [feature, ...rest] = projects

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-28">
      <Seo
        title="Projects"
        description="Four real Flutter projects — e-commerce apps, an admin dashboard, and a full-stack ordering platform. Real clients, real architecture decisions."
        path="/projects"
      />
      <Reveal>
        <p className="text-sm text-muted2 mb-4">Selected work</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4 max-w-3xl">
          Four real projects, four real clients.
        </h1>
        <p className="text-muted max-w-lg mb-20">
          No templates, no tutorials-as-portfolio. Every project here is a working build with its
          own architecture decisions.
        </p>
      </Reveal>

      <Reveal>
        <Link to={`/projects/${feature.slug}`} className="group block mb-8">
          <ProjectArt slug={feature.slug} number={feature.number} name={feature.name} className="h-[340px] md:h-[420px] mb-6" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs text-muted2 mb-2">{feature.role}</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold group-hover:text-violet transition-colors">
                {feature.name}
              </h2>
              <p className="text-muted text-sm mt-2 max-w-lg">{feature.summary}</p>
            </div>
            <span className="text-sm text-muted group-hover:text-ink group-hover:translate-x-1 transition-all whitespace-nowrap">
              View case study →
            </span>
          </div>
        </Link>
      </Reveal>

      <div className="mt-20 space-y-20">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link
              to={`/projects/${p.slug}`}
              className={`group grid md:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <ProjectArt slug={p.slug} number={p.number} name={p.name} className="h-64 md:h-80" />
              <div>
                <p className="text-xs text-muted2 mb-3">{p.role} · {p.year}</p>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3 group-hover:text-violet transition-colors">
                  {p.name}
                </h3>
                <p className="text-muted text-sm mb-5 max-w-md">{p.summary}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.stack.map((t) => (
                    <span key={t} className="text-xs border border-line rounded-full px-3 py-1 text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                  View case study →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
