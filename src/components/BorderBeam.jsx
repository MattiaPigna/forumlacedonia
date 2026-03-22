/**
 * BorderBeam — linea di luce che percorre il perimetro di una card.
 *
 * Tecnica: conic-gradient con @property CSS Houdini animato.
 * Il mask-composite exclude mostra solo la "cornice" del gradiente (non l'interno).
 *
 * Props:
 *   colorFrom  — colore iniziale del raggio  (default: verde neon)
 *   colorTo    — colore finale / coda          (default: ciano)
 *   duration   — secondi per un giro completo  (default: 3)
 *   borderWidth — spessore in px              (default: 1.5)
 *   delay      — delay animazione in secondi  (default: 0)
 */
export default function BorderBeam({
  colorFrom   = '#4ade80',
  colorTo     = '#22d3ee',
  duration    = 3,
  borderWidth = 1.5,
  delay       = 0,
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        borderRadius: 'inherit',
        padding: `${borderWidth}px`,
        background: `conic-gradient(
          from var(--beam-angle, 0deg),
          transparent   0%,
          transparent  65%,
          ${colorFrom} 80%,
          ${colorTo}   92%,
          transparent 100%
        )`,
        WebkitMask:          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite:       'exclude',
        animation: `beamRotate ${duration}s linear ${delay}s infinite`,
      }}
    />
  )
}
