import Reveal from '../components/Reveal'
import { process } from '../data/process'

export default function Process() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-28 border-t border-line">
      <Reveal>
        <p className="text-sm text-muted2 mb-4 font-medium">How I work</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-14 max-w-2xl">
          A clear process, not a black box.
        </h2>
      </Reveal>

      <div className="flex flex-col">
        {process.map((p, i) => (
          <Reveal key={p.step} delay={i * 0.06}>
            <div className="grid md:grid-cols-[80px_1fr] gap-4 md:gap-10 py-7 border-t border-line last:border-b items-start">
              <span className="font-display text-3xl font-bold text-muted2">{p.step}</span>
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8">
                <h3 className="font-display font-semibold text-lg w-full md:w-56 shrink-0">
                  {p.title}
                </h3>
                <p className="text-muted text-sm max-w-lg">{p.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
