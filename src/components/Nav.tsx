import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center gap-1 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-surface/90 backdrop-blur-md border-line px-2 py-2 shadow-lg'
            : 'bg-transparent border-transparent px-2 py-2'
        }`}
      >
        <Link
          to="/"
          className="font-display text-xs font-semibold tracking-wide px-3 py-1.5 mr-1"
        >
          UA<span className="text-violet">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-xs">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative px-3 py-1.5 rounded-full transition-colors ${
                pathname === l.to ? 'text-ink bg-surface2' : 'text-muted hover:text-ink'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden md:inline-flex text-xs font-semibold px-3 py-1.5 rounded-full bg-ink text-bg ml-1"
        >
          Let's talk
        </Link>

        <div className="ml-1">
          <ThemeToggle />
        </div>

        <button
          className="md:hidden px-3 py-2.5 text-ink text-sm min-w-[40px] min-h-[40px]"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '×' : '☰'}
        </button>
      </nav>

      {open && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-surface border border-line rounded-2xl px-4 py-4 flex flex-col text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-ink py-3.5 px-2 border-b border-line last:border-b-0">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
