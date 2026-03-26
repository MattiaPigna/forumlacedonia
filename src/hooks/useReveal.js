import { useEffect, useRef, useState } from 'react'

/**
 * Triggers a CSS "reveal" class when the element enters the viewport.
 * Usage:
 *   const [ref, isVisible] = useReveal()
 *   <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
 */
export function useReveal(threshold = 0.05) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Se l'elemento è già nel viewport al mount (es. dopo load Firebase), mostralo subito
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}
