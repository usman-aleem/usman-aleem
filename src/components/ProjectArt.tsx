import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { projectTheme } from '../data/projectTheme'

const patterns: Record<string, string> = {
  dots: `radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1.5px)`,
  lines: `repeating-linear-gradient(115deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 14px)`,
  grid: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
  rings: `repeating-radial-gradient(circle at 30% 30%, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 1px, transparent 1px, transparent 22px)`,
}

export default function ProjectArt({
  slug,
  number,
  className = '',
  name,
}: {
  slug: string
  number: string
  className?: string
  name?: string
}) {
  const theme = projectTheme[slug] ?? { from: '#7C5CFC', to: '#FF6B4A', pattern: 'dots' }
  const ref = useRef<HTMLDivElement>(null)
  const imageSrc = `/projects/${slug}.jpg`
  const [hasImage, setHasImage] = useState(false)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => { if (!cancelled) setHasImage(true) }
    img.onerror = () => { if (!cancelled) setHasImage(false) }
    img.src = imageSrc
    return () => { cancelled = true }
  }, [imageSrc])

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const scale = useMotionValue(1)
  const sscale = useSpring(scale, { stiffness: 200, damping: 20 })

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 8)
    rx.set(py * -8)
  }
  const handleEnter = () => scale.set(1.03)
  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ rotateX: srx, rotateY: sry, scale: sscale, transformPerspective: 800 }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Base layer: always the brand gradient, visible instantly and as fallback */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
      />

      {hasImage ? (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={imageSrc}
          alt={name ? `${name} — screenshot` : ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: patterns[theme.pattern],
            backgroundSize: theme.pattern === 'dots' ? '16px 16px' : theme.pattern === 'grid' ? '28px 28px' : undefined,
          }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(0deg, rgba(12,12,14,0.6), transparent 55%)' }}
      />
      <span
        className="absolute -bottom-6 -right-2 font-display font-bold text-white/10 select-none leading-none"
        style={{ fontSize: 'clamp(80px, 16vw, 200px)' }}
      >
        {number}
      </span>
    </motion.div>
  )
}
