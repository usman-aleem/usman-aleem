import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

type Msg = { role: 'bot' | 'user'; text: string }

// ---- Offline fallback (works with zero setup, zero API key, zero cost) ----
const FAQ: { keys: string[]; answer: string }[] = [
  {
    keys: ['built', 'project', 'work', 'portfolio', 'app'],
    answer:
      "Usman has shipped 4 real Flutter projects — full case study write-ups are being finalized and added to the Projects page. Check there for what's currently published.",
  },
  {
    keys: ['stack', 'tech', 'language', 'skill', 'flutter', 'python'],
    answer:
      "His core stack is Flutter, Dart, Python, FastAPI, Firebase and PostgreSQL, with Git/GitHub for version control. He's currently moving into Generative AI engineering and AI security.",
  },
  {
    keys: ['hire', 'freelance', 'available', 'client', 'budget', 'cost', 'price'],
    answer:
      "Usman takes on freelance Flutter work — from clean UI builds to full production apps with backend architecture. He's honest about being early-career: strong on execution, still growing on scale. Best next step is emailing him directly to discuss scope.",
  },
  {
    keys: ['contact', 'email', 'reach', 'linkedin', 'github'],
    answer:
      "Best way to reach him: usmanaleemdev@gmail.com or LinkedIn (linkedin.com/in/usman-aleem-201602434). His GitHub profile is still being set up.",
  },
  {
    keys: ['student', 'study', 'degree', 'education', 'university'],
    answer:
      "He's a BS Information Technology student at KFUEIT, Pakistan, building real client projects alongside his degree rather than waiting to graduate first.",
  },
  {
    keys: ['ai', 'generative', 'security', 'future', 'next'],
    answer:
      "He's using his Python foundation to move into Generative AI engineering and AI security — learning LLM engineering and RAG pipelines while still shipping Flutter apps.",
  },
]
function offlineRespond(input: string): string {
  const lower = input.toLowerCase()
  for (const entry of FAQ) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.answer
  }
  return "I don't have a specific answer for that — for anything beyond his projects, stack, or availability, email him directly at usmanaleemdev@gmail.com."
}

const SUGGESTIONS = ['What has he built?', "What's his stack?", 'How do I contact him?']
const MAX_INPUT = 400

export default function AgentWidget() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: "Ask me about Usman's projects, stack, or how to reach him. I can also take you straight to a project." },
  ])
  const [history, setHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [aiOffline, setAiOffline] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, open])

  const runTool = (tool: { name: string; input: any }) => {
    if (tool.name === 'navigate_to_page') {
      const map: Record<string, string> = { home: '/', about: '/about', projects: '/projects', contact: '/contact' }
      const path = map[tool.input?.page]
      if (path) {
        setOpen(false)
        navigate(path)
      }
    }
    if (tool.name === 'open_project') {
      const slug = tool.input?.slug
      if (slug) {
        setOpen(false)
        navigate(`/projects/${slug}`)
      }
    }
  }

  const send = async (text: string) => {
    const trimmed = text.trim().slice(0, MAX_INPUT)
    if (!trimmed || busy) return
    setMsgs((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setBusy(true)

    if (aiOffline) {
      setTimeout(() => {
        setMsgs((m) => [...m, { role: 'bot', text: offlineRespond(trimmed) }])
        setBusy(false)
      }, 300)
      return
    }

    const nextHistory = [...history, { role: 'user' as const, content: trimmed }]
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory }),
      })

      if (res.status === 503) {
        // No API key configured on the server yet — switch to offline mode silently.
        setAiOffline(true)
        setMsgs((m) => [...m, { role: 'bot', text: offlineRespond(trimmed) }])
        setBusy(false)
        return
      }
      if (!res.ok) throw new Error('bad status')

      const data = await res.json()
      if (data.text) {
        setMsgs((m) => [...m, { role: 'bot', text: data.text }])
        setHistory([...nextHistory, { role: 'assistant', content: data.text }])
      }
      if (data.tool) {
        if (data.text) {
          setTimeout(() => runTool(data.tool), 500)
        } else {
          runTool(data.tool)
        }
      }
      if (!data.text && !data.tool) {
        setMsgs((m) => [...m, { role: 'bot', text: offlineRespond(trimmed) }])
      }
    } catch {
      setMsgs((m) => [
        ...m,
        { role: 'bot', text: "Couldn't reach the assistant right now — here's what I can tell you locally: " + offlineRespond(trimmed) },
      ])
    }
    setBusy(false)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ y: -2 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-ink text-bg px-5 py-3 text-sm font-semibold shadow-lg"
        aria-label="Open Usman Assistant"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-violet" />
        Usman Assistant
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Usman Assistant"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-40px)] h-[min(460px,75dvh)] bg-surface border border-line rounded-xl overflow-hidden flex flex-col shadow-2xl"
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          >
            <div className="px-4 py-3 border-b border-line flex justify-between items-center bg-surface2">
              <div>
                <p className="text-sm font-semibold leading-tight">Usman Assistant</p>
                <p className="text-[10px] text-muted2 font-mono tracking-wide">
                  {aiOffline ? 'OFFLINE MODE' : 'PORTFOLIO INTELLIGENCE'}
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted text-lg leading-none">×</button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm leading-relaxed max-w-[85%] rounded-lg px-3 py-2 ${
                    m.role === 'bot'
                      ? 'bg-surface2 border border-line self-start'
                      : 'bg-violet text-white self-end'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {busy && (
                <div className="self-start bg-surface2 border border-line rounded-lg px-3 py-2 text-xs text-muted2 font-mono">
                  ANALYZING…
                </div>
              )}
            </div>

            {msgs.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs border border-line text-muted rounded-full px-3 py-1.5 hover:border-violet hover:text-ink transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-line flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder="Ask something..."
                maxLength={MAX_INPUT}
                aria-label="Message"
                style={{ fontSize: 16 }}
                className="flex-1 bg-surface2 border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-violet"
              />
              <button
                onClick={() => send(input)}
                disabled={busy || !input.trim()}
                className="bg-violet text-white text-sm font-semibold px-4 rounded-md disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
