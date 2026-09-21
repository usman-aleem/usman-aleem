import Reveal from '../components/Reveal'
import { journey } from '../data/stack'
import Seo from '../components/Seo'
import usman from '../assets/usman.jpg'

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-28">
      <Seo
        title="About"
        description="Usman Aleem's path from zero programming knowledge to shipping real Flutter client projects — and why he's building toward Generative AI next."
        path="/about"
      />
      <Reveal>
        <p className="text-sm text-muted2 mb-4">About</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold mb-16 max-w-3xl leading-tight">
          I said yes to my first client before I knew how to build what I'd promised.
        </h1>
      </Reveal>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start mb-24">
        <Reveal>
          <div className="rounded-2xl overflow-hidden border border-line aspect-[4/5]">
            <img src={usman} alt="Usman Aleem" className="w-full h-full object-cover" style={{ filter: 'grayscale(10%) contrast(1.05)' }} />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-muted leading-relaxed">
          <p>
            That's not a humble-brag — it's just true, and it's honestly how I learned Flutter.
            Tutorials teach you syntax. A client with a deadline teaches you everything else: how
            to scope a feature you don't fully understand yet, how to debug a Firebase error at
            1am with no obvious cause, how to say "that'll take longer than I thought" and still
            deliver.
          </p>
          <p>
            I'm an IT student in Pakistan. Depending on who you ask, that either means I'm too
            early in my career to take seriously, or exactly hungry enough to be worth watching.
            I know which one I'm betting on.
          </p>
          <p>
            Four projects in, the thing I'm actually proud of isn't any single screen — it's that
            I run every project the same disciplined way now. Real requirements before I touch
            Flutter. Architecture decisions I can explain, not just defend. A go-live checklist I
            follow, not a vibe check that says "looks done."
          </p>
          <p>
            The next chapter is backend and AI — Python, FastAPI, and eventually Generative AI
            and AI security. I'm not there yet. But "not there yet" has gotten me through every
            stage so far, so I'm not particularly worried about this one either.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-10">How I got here</h2>
      </Reveal>
      <div className="space-y-0">
        {journey.map((j, i) => (
          <Reveal key={j.stage} delay={i * 0.06}>
            <div className="flex gap-8 py-6 border-t border-line last:border-b">
              <span className="font-mono text-muted2 text-sm w-8 shrink-0">0{i + 1}</span>
              <div className="flex-1 flex justify-between flex-wrap gap-2">
                <h3 className="font-display font-semibold text-lg w-40 shrink-0">{j.stage}</h3>
                <p className="text-muted text-sm max-w-md">{j.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
