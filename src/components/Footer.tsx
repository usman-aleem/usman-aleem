import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-display font-semibold text-lg mb-1">USMAN ALEEM</p>
          <p className="text-muted text-sm">IT Student & Aspiring Software Developer</p>
        </div>

        <div className="flex gap-10 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-muted2 text-xs mb-1">Navigate</span>
            <Link to="/about" className="text-muted hover:text-ink transition-colors">About</Link>
            <Link to="/projects" className="text-muted hover:text-ink transition-colors">Projects</Link>
            <Link to="/contact" className="text-muted hover:text-ink transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-muted2 text-xs mb-1">Connect</span>
            <a href="mailto:usmanaleemdev@gmail.com" className="text-muted hover:text-ink transition-colors">Email</a>
            <a href="https://www.linkedin.com/in/usman-aleem-201602434" target="_blank" rel="noreferrer" className="text-muted hover:text-ink transition-colors">LinkedIn</a>
            <span className="text-muted2">GitHub — coming soon</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-8 text-xs text-muted2 flex justify-between">
        <span>© {new Date().getFullYear()} Usman Aleem</span>
        <span>Building. Learning. Experimenting. Shipping.</span>
      </div>
    </footer>
  )
}
