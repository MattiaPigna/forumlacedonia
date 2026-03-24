import { useReveal } from '../hooks/useReveal'

const LABS = [
  {
    id:     'Lab 01',
    title:  'Cultura & Arte',
    description: 'Cinema, musica, teatro, letteratura. Progetti per valorizzare l\'identità culturale di Lacedonia.',
    icon:   '🎭',
    color:  'border-indigo-500/30 hover:border-indigo-500/60',
    glow:   'rgba(99,102,241,0.08)',
  },
  {
    id:     'Lab 02',
    title:  'Ambiente & Territorio',
    description: 'Sostenibilità, green economy e valorizzazione del paesaggio irpino.',
    icon:   '🌿',
    color:  'border-emerald-500/30 hover:border-emerald-500/60',
    glow:   'rgba(16,185,129,0.07)',
  },
  {
    id:     'Lab 03',
    title:  'Sport & Benessere',
    description: 'Promozione dello sport, attività fisiche e benessere psico-fisico giovanile.',
    icon:   '⚽',
    color:  'border-sky-500/30 hover:border-sky-500/60',
    glow:   'rgba(14,165,233,0.07)',
  },
  {
    id:     'Lab 04',
    title:  'Politiche Sociali',
    description: 'Inclusione, pari opportunità e contrasto alle discriminazioni.',
    icon:   '🤝',
    color:  'border-pink-500/30 hover:border-pink-500/60',
    glow:   'rgba(236,72,153,0.07)',
  },
  {
    id:     'Lab 05',
    title:  'Europa & Mondo',
    description: 'Erasmus+, gemellaggi e reti europee di Forum giovanili.',
    icon:   '🌍',
    color:  'border-violet-500/30 hover:border-violet-500/60',
    glow:   'rgba(139,92,246,0.08)',
  },
]

export default function CreativeLab() {
  const [ref, isVisible] = useReveal()

  return (
    <section id="creative" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.07), transparent), #0a0a0a',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Laboratori Creativi</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-gradient leading-tight">
              Officina<br />di Idee.
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            Il Forum non è solo istituzione: è un laboratorio dove le idee
            prendono forma e diventano progetti concreti — per Lacedonia e per l'Europa.
          </p>
        </div>

        {/* ── Bento Labs Grid ── */}
        <div
          ref={ref}
          className={`reveal ${isVisible ? 'visible' : ''}`}
        >
          {/* Row 1: 3 labs */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {LABS.slice(0, 3).map(({ id, title, description, icon, color, glow }) => (
              <article
                key={id}
                className={`glass glass-hover p-7 border transition-all duration-300 ${color}`}
                style={{ '--glow': glow }}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-gray-600 text-[10px] font-bold tracking-[0.15em]">{id}</span>
                  <span className="text-2xl" role="img" aria-label={title}>{icon}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </article>
            ))}
          </div>

          {/* Row 2: 2 remaining labs + CTA card */}
          <div className="grid md:grid-cols-3 gap-4">
            {LABS.slice(3).map(({ id, title, description, icon, color }) => (
              <article
                key={id}
                className={`glass glass-hover p-7 border transition-all duration-300 ${color}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-gray-600 text-[10px] font-bold tracking-[0.15em]">{id}</span>
                  <span className="text-2xl" role="img" aria-label={title}>{icon}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </article>
            ))}

            {/* CTA card */}
            <div
              className="p-7 rounded-2xl border border-indigo-500/30 flex flex-col justify-between min-h-[180px] cursor-pointer group transition-all duration-300 hover:border-indigo-500/60 hover:shadow-glow"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))' }}
            >
              <span className="text-indigo-400 text-[10px] font-bold tracking-[0.15em] uppercase">
                Proponi un progetto
              </span>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Hai un'idea?</h3>
                <p className="text-gray-400 text-sm mb-5">
                  Proponi il tuo laboratorio alla Giunta Comunale.
                </p>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors"
                >
                  Scrivici
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
