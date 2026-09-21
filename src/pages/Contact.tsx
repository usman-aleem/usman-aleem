import Reveal from '../components/Reveal'
import Seo from '../components/Seo'

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-32">
      <Seo
        title="Contact"
        description="Get in touch with Usman Aleem for freelance Flutter development — email or LinkedIn."
        path="/contact"
      />
      <Reveal>
        <p className="text-sm text-muted2 mb-6">Contact</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6 leading-tight">
          Have an idea worth building?
        </h1>
        <p className="text-2xl md:text-3xl font-display text-muted mb-16">
          Let's make something real.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="mailto:usmanaleemdev@gmail.com"
            className="group border border-line rounded-2xl p-8 hover:border-violet transition-colors"
          >
            <p className="text-xs text-muted2 mb-3">Email</p>
            <p className="font-display text-xl font-semibold mb-4 group-hover:text-violet transition-colors">
              usmanaleemdev@gmail.com
            </p>
            <span className="text-sm text-muted">Send a message →</span>
          </a>

          <a
            href="https://www.linkedin.com/in/usman-aleem-201602434"
            target="_blank"
            rel="noreferrer"
            className="group border border-line rounded-2xl p-8 hover:border-violet transition-colors"
          >
            <p className="text-xs text-muted2 mb-3">LinkedIn</p>
            <p className="font-display text-xl font-semibold mb-4 group-hover:text-violet transition-colors">
              /in/usman-aleem-201602434
            </p>
            <span className="text-sm text-muted">Connect →</span>
          </a>

          <div className="border border-line rounded-2xl p-8 opacity-60 sm:col-span-2">
            <p className="text-xs text-muted2 mb-3">GitHub</p>
            <p className="font-display text-xl font-semibold mb-2">Profile in progress</p>
            <span className="text-sm text-muted">Check back soon — link will be added here.</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-16 border-t border-line pt-10">
        <p className="text-muted text-sm max-w-lg">
          Currently available for freelance Flutter work — from UI builds to full production apps
          with backend architecture. Based in Pakistan, working with clients on Fiverr, Upwork,
          and direct contact.
        </p>
      </Reveal>
    </div>
  )
}
