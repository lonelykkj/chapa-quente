import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

type RevealState = 'idle' | 'hidden' | 'shown'

/**
 * Fades/slides an element up when it scrolls into view.
 * Only elements that start below the fold are hidden, so nothing visible on load flashes.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()
  const [state, setState] = useState<RevealState>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const belowFold = el.getBoundingClientRect().top > window.innerHeight
    if (!reduce && belowFold) setState('hidden')

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setState('shown')
        io.disconnect()
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, threshold])

  const className = state === 'idle' ? '' : state === 'hidden' ? 'rv' : 'rv in'
  return { ref, className, visible: state === 'shown' }
}
