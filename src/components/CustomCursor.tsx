import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 260, damping: 26 })
  const ringY = useSpring(dotY, { stiffness: 260, damping: 26 })
  const raf = useRef<number>()

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.documentElement.classList.add('cc-active')

    const move = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        dotX.set(e.clientX)
        dotY.set(e.clientY)
      })
    }
    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, [data-cursor-hover]')
      setHovering(!!target)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.classList.remove('cc-active')
    }
  }, [dotX, dotY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-ink pointer-events-none z-[300]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[300] mix-blend-difference"
        animate={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          borderColor: hovering ? '#7C5CFC' : 'rgba(243,241,236,0.5)',
          opacity: hovering ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
