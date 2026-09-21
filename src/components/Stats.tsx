import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import Reveal from './Reveal'

const stats = [
  { value: 4, suffix: '', label: 'Shipped projects' },
  { value: 16, suffix: '', label: 'Admin dashboard modules built' },
  { value: 0, suffix: '', label: 'Recurring infra cost on current build' },
  { value: 100, suffix: '%', label: 'Solo-developed, no team' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v) + suffix)

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 1.2, ease: [0.22, 0.9, 0.28, 1] })
      return controls.stop
    }
  }, [inView, value, mv])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export default function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 border-t border-line">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <p className="font-display text-4xl md:text-5xl font-semibold mb-2 bg-gradient-to-r from-violet to-coral bg-clip-text text-transparent">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
