import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setShow(false), reduced ? 0 : 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[500] bg-bg flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.05em' }}
            transition={{ duration: 0.8, ease: [0.22, 0.9, 0.28, 1] }}
            className="font-display font-semibold text-lg md:text-xl"
          >
            USMAN<span className="text-violet">.</span>ALEEM
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
