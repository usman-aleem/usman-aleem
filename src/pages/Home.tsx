import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'
import ProjectArt from '../components/ProjectArt'
import Stats from '../components/Stats'
import Process from '../components/Process'
import Seo from '../components/Seo'
import { currentStack, exploring, journey } from '../data/stack'
import { projects } from '../data/projects'

export default function Home() {
  const featured = projects.find((p) => p.featured)!

  return (
    <>
      <Seo
        title="Usman Aleem — IT Student & Aspiring Software Developer"
        description="Flutter developer building real client apps — e-commerce, admin dashboards, backend systems — while moving toward Generative AI engineering."
        path="/"
      />
      <Hero />

      {/* About teaser */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-28 border-t border-line">
        <Reveal>
          <p className="text-sm text-muted2 mb-4 font-medium">01 — About</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight max-w-3xl mb-8">
            I said yes before I knew how — that's the whole story.
          </h2>
          <p className="text-muted max-w-xl mb-6">
            Four projects in, I run every one the same disciplined way: real requirements,
            architecture I can explain, and a go-live checklist instead of a vibe check.
          </p>
          <MagneticButton to="/about" variant="ghost">Read the full story →</MagneticButton>
        </Reveal>
      </section>

      {/* Journey */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-28 border-t border-line">
        <Reveal>
          <p className="text-sm text-muted2 mb-4 font-medium">02 — Journey</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-14">The path so far</h2>
        </Reveal>
        <div className="grid md:grid-cols-5 gap-6">
          {journey.map((j, i) => (
            <Reveal key={j.stage} delay={i * 0.08}>
              <div className="border-t border-line pt-5">
                <span className="text-xs text-muted2 font-mono">0{i + 1}</span>
                <h3 className="font-display font-semibold text-lg mt-2 mb-2">{j.stage}</h3>
                <p className="text-sm text-muted">{j.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Current focus */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-28 border-t border-line">
        <Reveal>
          <p className="text-sm text-muted2 mb-4 font-medium">03 — Current focus</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-14">What I'm exploring now</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <h3 className="text-sm text-muted2 mb-5 uppercase tracking-wide font-medium" style={{ textTransform: 'none' }}>
              Working with today
            </h3>
            <ul className="space-y-3">
              {currentStack.map((s) => (
                <li key={s.name} className="flex justify-between border-b border-line pb-3 text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted text-right">{s.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-sm text-muted2 mb-5 font-medium">Exploring next</h3>
            <ul className="space-y-3">
              {exploring.map((s) => (
                <li key={s.name} className="flex justify-between border-b border-line pb-3 text-sm">
                  <span className="font-medium bg-gradient-to-r from-violet to-coral bg-clip-text text-transparent">
                    {s.name}
                  </span>
                  <span className="text-muted text-right">{s.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Featured project */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-28 border-t border-line">
        <Reveal>
          <p className="text-sm text-muted2 mb-8 font-medium">05 — Featured project</p>
          <Link to={`/projects/${featured.slug}`} className="group block">
            <ProjectArt slug={featured.slug} number={featured.number} name={featured.name} className="h-72 md:h-[380px] mb-8" />
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 group-hover:text-violet transition-colors">
                  {featured.name}
                </h2>
                <p className="text-muted mb-6 max-w-xl">{featured.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.stack.map((t) => (
                    <span key={t} className="text-xs border border-line rounded-full px-3 py-1 text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-sm font-semibold whitespace-nowrap group-hover:translate-x-1 transition-transform">
                View full case study →
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Process */}
      <Process />

      {/* Contact CTA */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-32 border-t border-line text-center">
        <Reveal>
          <p className="text-sm text-muted2 mb-6">Have an idea worth building?</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-10">
            Let's make something real.
          </h2>
          <MagneticButton to="/contact" variant="primary">Start a conversation →</MagneticButton>
        </Reveal>
      </section>
    </>
  )
}
