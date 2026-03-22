import { useRef, useState } from 'react'

const FADE_MS    = 1200   // durata crossfade in ms
const CUE_BEFORE = 1.0    // secondi prima della fine in cui inizia il fade

export default function SmoothVideo({ src, videoOpacity = 0.55 }) {
  const vidA = useRef(null)
  const vidB = useRef(null)
  const active      = useRef('A')   // quale video è il "principale"
  const crossfading = useRef(false)

  const [opA, setOpA] = useState(videoOpacity)
  const [opB, setOpB] = useState(0)

  const doCrossfade = () => {
    if (crossfading.current) return
    crossfading.current = true

    const isA      = active.current === 'A'
    const incoming = isA ? vidB : vidA
    const setIn    = isA ? setOpB : setOpA
    const setOut   = isA ? setOpA : setOpB
    const outgoing = isA ? vidA : vidB

    // avvia il video in standby dall'inizio
    if (incoming.current) {
      incoming.current.currentTime = 0
      incoming.current.play().catch(() => {})
    }

    // applica le opacità: fade-in su incoming, fade-out su outgoing
    setIn(videoOpacity)
    setOut(0)

    setTimeout(() => {
      active.current = isA ? 'B' : 'A'
      if (outgoing.current) {
        outgoing.current.pause()
        outgoing.current.currentTime = 0
      }
      crossfading.current = false
    }, FADE_MS)
  }

  const handleTimeUpdate = (e) => {
    const v = e.target
    if (!v.duration || v.duration === Infinity) return
    if (v.currentTime >= v.duration - CUE_BEFORE) doCrossfade()
  }

  const sharedStyle = {
    zIndex: 2,
    transition: `opacity ${FADE_MS}ms ease-in-out`,
  }

  return (
    <>
      <video
        ref={vidA}
        autoPlay muted playsInline preload="auto"
        aria-hidden="true"
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{ ...sharedStyle, opacity: opA }}
      >
        <source src={src} type="video/mp4" />
      </video>

      <video
        ref={vidB}
        muted playsInline preload="auto"
        aria-hidden="true"
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{ ...sharedStyle, opacity: opB }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  )
}
