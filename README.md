# Usman Aleem — Portfolio

Real Vite + React + TypeScript + Tailwind + Framer Motion project. Not an artifact — this is a
standalone app you run and deploy yourself.

## Turning on the real AI assistant (optional)

Right now "Usman Assistant" works with zero setup — it answers from a built-in rule-based FAQ,
with no API key and no cost. To upgrade it to a real Claude-powered assistant that can also
navigate the site ("take me to your best project"):

1. Get an API key from [console.anthropic.com](https://console.anthropic.com) — usage is billed
   to your own account (this uses a cheap, fast model, so cost per conversation is small, but it
   is not free).
2. In your Vercel project: **Settings → Environment Variables** → add `ANTHROPIC_API_KEY` with
   your key.
3. Redeploy. That's it — no code changes. The widget detects the key automatically: if it's
   missing, it silently uses the offline FAQ; if it's present, real AI answers kick in.

The API key is only ever read server-side in `api/chat.ts` (a Vercel serverless function) — it
is never sent to the browser. This is the architecture the security-conscious version of this
feature requires; calling the Anthropic API directly from browser code would expose your key to
anyone who opens dev tools, which is why the site never does that.

**What's intentionally NOT built**, and why:
- **Voice input/output** — real but optional scope; skipped to keep the core assistant solid
  rather than spreading effort thin.
- **Streaming responses** — adds real complexity (SSE handling, partial-render UI) that isn't
  proportionate to a portfolio FAQ widget's actual needs.
- **Bulletproof rate limiting** — the current limiter is in-memory and best-effort (serverless
  instances aren't guaranteed to persist between requests). A hard guarantee needs Vercel KV or
  Upstash Redis — a separate signup. What's shipped instead: strict input-length caps, a short
  max-token response limit, and a cheap model, which keep worst-case cost low even without a
  perfect limiter.
- **Analytics/observability dashboards** — would need a separate analytics service; not worth
  the added dependency for a personal portfolio's chat widget.

## After you deploy — update the domain in these files

Several files have a placeholder domain (`usman-aleem-portfolio.vercel.app`) that needs to match
your real deployed URL. Find-and-replace it in:

- `index.html` — OG/Twitter image tags + JSON-LD structured data
- `src/components/Seo.tsx` — `BASE_URL` constant (drives canonical URLs + per-page OG tags)
- `public/robots.txt` — sitemap reference
- `public/sitemap.xml` — every URL entry

Without this, social previews and search engine indexing will point at the wrong domain.

**Honest limitation to know about:** this is a client-side React app (a single-page app), not a
server-rendered one. The per-page titles/descriptions (`Seo.tsx`) update correctly for real
browsers and for Google's crawler (which executes JavaScript). But crawlers that do NOT execute
JavaScript — WhatsApp, Twitter/X, and sometimes LinkedIn's link-preview bots — only ever see the
static `index.html`, so a shared link to `/projects/crochet-by-urooj` will show the homepage's
preview image and description, not that project's. Fixing this properly needs static
pre-rendering (e.g. Next.js, or a Vite prerender plugin) — a real rebuild, not a small patch. For
a personal portfolio this is a minor tradeoff (the homepage preview is still accurate and
professional), but it's worth knowing rather than assuming every shared link looks perfect.

## Do this first — add your real screenshots

Right now every project shows a gradient placeholder instead of an actual screenshot of the app.
This is the single most important thing missing: no proof, no matter how good the design looks.

Drop screenshots into `public/projects/`, named exactly:

```
crochet-by-urooj.jpg
azu-wears.jpg
sakinah.jpg
younas-sweet-bakers.jpg
```

That's it — no code edits needed. The site checks for these automatically at runtime: if the
file exists, it replaces the gradient panel; if it's missing, the gradient keeps showing and
nothing breaks. See `public/projects/README.md` for screenshot tips.

## After you deploy — one more edit

Open `index.html` and change these two lines to your real live URL (social preview images need
an absolute URL, not a relative one):

```html
<meta property="og:image" content="/og-image.jpg" />
<meta name="twitter:image" content="/og-image.jpg" />
```

becomes, for example:

```html
<meta property="og:image" content="https://usman-aleem-portfolio.vercel.app/og-image.jpg" />
<meta name="twitter:image" content="https://usman-aleem-portfolio.vercel.app/og-image.jpg" />
```

Without this, links you share on WhatsApp/LinkedIn/Fiverr won't show a preview image. You can
also replace `public/og-image.jpg` with a nicer designed share card later — your photo is just
the placeholder for now.

## Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview   # test the production build locally
```

Output goes to `dist/` — deploy that folder to Vercel, Netlify, GitHub Pages, or any static host.
Vercel/Netlify: just connect the repo, build command `npm run build`, output directory `dist`.

## What's real vs. what's a placeholder

- **GitHub link** — not filled in yet (you said the account is half-set-up). It's marked
  "coming soon" in the footer, Contact page, and homepage. Search for `GitHub — coming soon` /
  `Profile in progress` in `src/components/Footer.tsx` and `src/pages/Contact.tsx` and swap in
  your real URL once it's ready.
- **All project facts, dates, and stack details** come from your actual project history — nothing
  invented. Edit `src/data/projects.ts` and `src/data/stack.ts` if any detail needs correcting.

## Decisions made instead of the original brief — and why

Your brief asked for a few things that don't work outside of very specific setups. Rather than
fake them, here's what shipped instead:

1. **Cinematic AI-generated motion portrait → scroll image sequence.** Not built. This needs a
   video/motion-generation pipeline that wasn't available to build this. Your real photo is used
   instead, with scroll-driven parallax, scale, and a subtle color-light overlay (`Hero.tsx`) —
   real motion, no synthetic animation of your face.
2. **GSAP.** Swapped for Framer Motion — same category of tool (scroll-linked, spring-based
   animation), actively maintained, smaller footprint, and pairs natively with React.
3. **The "Ask about Usman" agent.** This ships as a rule-based FAQ responder
   (`src/components/AgentWidget.tsx`) that works immediately with zero setup, zero API key, and
   zero cost. A real LLM-backed version (like the one built earlier in Claude chat) needs a
   server-side proxy — you can't safely call the Anthropic API directly from a deployed browser
   app, since that would expose your API key to anyone who opens dev tools. If you want the real
   version later: write a small serverless function (Vercel/Netlify function works well) that
   holds your API key server-side and forwards chat requests to `api.anthropic.com`, then point
   this widget's `send()` function at that endpoint instead of the local `respond()` function.
4. **3D / WebGL.** Skipped in favor of a lighter CSS/canvas-free ambient glow (`AmbientGlow.tsx`).
   A full Three.js scene adds real bundle weight and render cost for a personal portfolio — not
   worth it unless you want to invest in it deliberately later.

## Project structure

```
src/
  components/   Nav, Hero, Footer, AgentWidget, Reveal, MagneticButton, AmbientGlow, CursorGlow
  pages/        Home, Projects, ProjectDetail, About, Contact
  data/         projects.ts, stack.ts — edit these to update content, not the components
  assets/       your photo
```

Routing is real (`react-router-dom`) — `/`, `/about`, `/projects`, `/projects/:slug`, `/contact`
are actual separate routes.
