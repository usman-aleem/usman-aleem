import { motion } from 'framer-motion'
import type { FlowStep } from '../data/architecture'

export default function ArchitectureFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="border border-line rounded-2xl p-6 md:p-8 bg-surface/40">
      <p className="text-xs text-muted2 mb-6 font-mono">How it's built — real system flow</p>
      <div className="flex flex-col">
        {steps.map((s, i) => (
          <div key={s.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="w-2.5 h-2.5 rounded-full bg-violet shrink-0 mt-1.5"
              />
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.3 }}
                  style={{ transformOrigin: 'top' }}
                  className="w-px flex-1 bg-line min-h-[28px]"
                />
              )}
            </div>
            <div className="pb-6">
              <p className="font-display font-semibold text-base">{s.label}</p>
              <p className="text-sm text-muted">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
