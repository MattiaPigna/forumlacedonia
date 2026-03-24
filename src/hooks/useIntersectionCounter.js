import { useState, useEffect, useRef } from 'react'

export function useIntersectionCounter(target, duration = 1400) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const ran = useRef(false)

  useEffect(() => {
    if (!target || ran.current) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        ran.current = true
        observer.disconnect()
        const start = performance.now()
        function tick(now) {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}
