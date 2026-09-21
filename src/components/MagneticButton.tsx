import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function MagneticButton({
  to,
  href,
  children,
  variant = 'primary',
}: {
  to?: string
  href?: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.25)
    y.set(relY * 0.25)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors'
  const styles =
    variant === 'primary'
      ? 'bg-ink text-bg hover:bg-white'
      : 'border border-line text-ink hover:border-violet'

  const content = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.div>
  )

  if (to) return <Link to={to}>{content}</Link>
  if (href) return <a href={href} target="_blank" rel="noreferrer">{content}</a>
  return content
}
