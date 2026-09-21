import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const move = (e: MouseEvent) => {
      if (!ref.current) return
      ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={ref}
      className="hidden md:block pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full -z-10 opacity-[0.06] blur-[90px] transition-transform duration-300 ease-out"
      style={{ background: 'radial-gradient(circle, #7C5CFC, transparent 70%)' }}
      aria-hidden="true"
    />
  )
}
