import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'
import usman from '../assets/usman.jpg'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const words = ['Most people learn', 'tech for a job.', "I'm learning how", 'it actually works.']

  return (
    <section ref={ref} className="relative min-h-screen min-h-[100dvh] flex items-center pt-32 md:pt-24 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-[1.2fr_0.9fr] gap-12 items-center w-full">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-muted mb-6 font-medium tracking-wide"
          >
            Usman Aleem — IT Student & Aspiring Software Developer
          </motion.p>

          <h1 className="font-display font-semibold text-[13vw] md:text-[4.4vw] leading-[1.04] mb-8">
            {words.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%', filter: 'blur(8px)' }}
                  animate={{ y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 0.9, 0.28, 1] }}
                  className={`block ${i >= 2 ? 'bg-gradient-to-r from-violet via-coral to-magenta bg-clip-text text-transparent' : ''}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-muted text-base md:text-lg max-w-md mb-10"
          >
            I'm Usman — a Flutter developer shipping real client apps, learning backend
            engineering with Python and FastAPI, and building toward Generative AI next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton to="/projects" variant="primary">
              See the work <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton to="/contact" variant="ghost">
              Let's talk
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 0.9, 0.28, 1] }}
          className="relative"
        >
          <motion.div
            style={{ scale: photoScale, y: photoY }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-line"
          >
            <img
              src={usman}
              alt="Usman Aleem"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(0deg, rgba(12,12,14,0.5), transparent 35%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(124,92,252,0.5), rgba(255,107,74,0.4), rgba(217,70,168,0.5))',
                mixBlendMode: 'color',
                opacity: 0.35,
              }}
            />
          </motion.div>
          <div className="absolute -bottom-4 -left-4 bg-bg border border-line rounded-full px-4 py-2 text-xs text-muted font-medium">
            Rahim Yar Khan, Pakistan
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs">
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-muted to-transparent"
        />
      </div>
    </section>
  )
}
