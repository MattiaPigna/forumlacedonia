import { useEffect, useRef, useState } from 'react'

/**
 * Triggers a CSS "reveal" class when the element enters the viewport.
 * Usage:
 *   const [ref, isVisible] = useReveal()
 *   <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

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
