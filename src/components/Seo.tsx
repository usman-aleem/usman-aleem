import { useEffect } from 'react'

const SITE_NAME = 'Usman Aleem'
const BASE_URL = 'https://usman-aleem-portfolio.vercel.app' // update after real deploy — see README

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let tag = document.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(path: string) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', `${BASE_URL}${path}`)
}

export default function Seo({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`
    document.title = fullTitle
    setMeta('description', description)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:url', `${BASE_URL}${path}`, true)
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setCanonical(path)
  }, [title, description, path])

  return null
}
