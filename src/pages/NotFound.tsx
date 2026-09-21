import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 pt-40 pb-32 text-center">
      <Seo title="Page not found" description="This page doesn't exist." path="/404" />
      <Reveal>
        <p className="text-sm text-muted2 mb-4 font-mono">404</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6">
          This page doesn't exist.
        </h1>
        <p className="text-muted mb-10">
          The link might be broken, or the page moved. Here's where you can go instead.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <MagneticButton to="/" variant="primary">Back to home →</MagneticButton>
          <MagneticButton to="/projects" variant="ghost">See the work →</MagneticButton>
        </div>
        <p className="mt-10">
          <Link to="/contact" className="text-sm text-muted hover:text-ink underline underline-offset-4">
            Or get in touch
          </Link>
        </p>
      </Reveal>
    </div>
  )
}
