import logoImg     from '../assets/logo.png'
import SmoothVideo from './SmoothVideo'

const CANDIDATURE_URL = 'https://sign-here-easily.lovable.app/'

const STATS = [
  { value: '16–34', label: 'Anni per candidarsi'    },
  { value: '2',     label: 'Anni di mandato'         },
  { value: '5',     label: 'Laboratori creativi'     },
  { value: 'Free',  label: 'Partecipazione gratuita' },
]

const STARS = Array.from({ length: 130 }, (_, i) => {
  const big = Math.random() > 0.88
  const med = !big && Math.random() > 0.72
  return {
    id:    i,
    top:   `${(Math.random() * 100).toFixed(2)}%`,
    left:  `${(Math.random() * 100).toFixed(2)}%`,
    size:  big ? 3 : med ? 2 : 1,
    delay: `${(Math.random() * 5).toFixed(1)}s`,
    dur:   `${(1.2 + Math.random() * 2).toFixed(1)}s`,
    maxOp: big ? 1 : med ? 0.75 : 0.5,
  }
})

export default function Hero() {
  return (
    <section
      aria-label="Benvenuti nel Forum dei Giovani"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]"
    >

      {/* ── LAYER 1: Starfield ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {STARS.map(({ id, top, left, size, maxOp, delay, dur }) => (
          <span
            key={id}
            className="absolute rounded-full bg-white"
            style={{
              top, left,
              width: size, height: size,
              opacity: maxOp * 0.3,
              boxShadow: size >= 2 ? `0 0 ${size * 4}px rgba(255,255,255,${maxOp * 0.8})` : 'none',
              animationName: 'starPulse',
              animationDuration: dur,
              animationDelay: delay,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              animationDirection: 'alternate',
              '--max-op': maxOp,
            }}
          />
        ))}
      </div>

      {/* ── LAYER 2: Video con loop morbido (crossfade tra due istanze) ── */}
      <SmoothVideo
        src="/Video_Elettrico_in_Loop.mp4"
        videoOpacity={0.55}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.75) 80%, #0a0a0a 100%)',
        }}
      />

      {/* Indigo glow radiale */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          zIndex: 3,
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.2) 0%, transparent 70%)',
        }}
      />

      {/* ── LAYER 3: Contenuto ── */}
      <div
        className="relative mt-auto w-full max-w-4xl mx-auto px-6 pt-[18vh] pb-16 flex flex-col items-center text-center"
        style={{ zIndex: 4 }}
      >

        {/* Logo */}
        <div className="animate-fade-in delay-1 opacity-0 mb-10 relative flex items-center justify-center">
          <img
            src={logoImg}
            alt="Forum dei Giovani di Lacedonia"
            className="relative h-36 md:h-44 w-auto object-contain mx-auto"
            style={{
              opacity: 0.75,
              filter:
                'drop-shadow(0 0 1px rgba(255,255,255,1)) drop-shadow(0 0 1px rgba(255,255,255,1)) drop-shadow(0 0 2px rgba(255,255,255,0.8)) drop-shadow(0 0 8px rgba(255,255,255,0.3))',
            }}
          />
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-3 opacity-0 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
          <span className="text-white block">Il futuro ha la nostra voce.</span>
          <span
            className="block mt-1"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Trasforma le tue idee in progetti.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up delay-4 opacity-0 text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
          L'organismo ufficiale per giovani tra i{' '}
          <span className="text-white font-semibold">16 e i 34 anni</span>.{' '}
          Uno spazio istituzionale e creativo per diventare protagonisti della vita pubblica.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-5 opacity-0 flex flex-wrap items-center justify-center gap-4 mb-20">
          <a
            href={CANDIDATURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-black transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)',
              boxShadow: '0 0 24px rgba(74,222,128,0.35)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(74,222,128,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(74,222,128,0.35)' }}
          >
            Candidati
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#principles"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm text-white border border-white/15 backdrop-blur-md transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            Scopri le Finalità
          </a>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-up delay-6 opacity-0 w-full max-w-3xl">
          <div
            className="rounded-2xl py-6 px-8 backdrop-blur-md border border-white/[0.08]"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/[0.06]">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 first:pl-0 pl-4 md:pl-6">
                  <span className="text-2xl font-bold text-white">{value}</span>
                  <span className="text-gray-500 text-xs text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-6 opacity-0" style={{ zIndex: 4 }}>
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-gray-700" />
        <span className="text-gray-700 text-[10px] tracking-[0.2em] uppercase">Scorri</span>
      </div>

      <style>{`
        @keyframes starPulse {
          from { opacity: calc(var(--max-op, 0.5) * 0.15); }
          to   { opacity: var(--max-op, 0.5); }
        }
      `}</style>
    </section>
  )
}
