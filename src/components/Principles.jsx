import { useReveal } from '../hooks/useReveal'
import BorderBeam   from './BorderBeam'

const STAT = { value: '100%', label: 'Gratuito & aperto a tutti i giovani lacedoniesi' }

const MAIN = [
  {
    id:          'democrazia',
    number:      '01',
    title:       'Democrazia',
    description: 'Promuovere i valori democratici e la partecipazione attiva dei giovani alla vita politica e civica del territorio, valorizzando ogni forma di espressione civile.',
    accent:      'bg-indigo-500/10 border-indigo-500/20',
    tag:         'Principio fondante',
    beam:        { colorFrom: '#4ade80', colorTo: '#22d3ee', duration: 3.5 },
  },
  {
    id:          'partecipazione',
    number:      '02',
    title:       'Partecipazione',
    description: 'Garantire che la voce dei giovani tra i 16 e i 34 anni venga ascoltata e pesi nelle decisioni che riguardano la comunità di Lacedonia, a livello locale ed europeo.',
    accent:      'bg-violet-500/10 border-violet-500/20',
    tag:         'Diritto fondamentale',
    beam:        { colorFrom: '#8b5cf6', colorTo: '#6366f1', duration: 4, delay: 0.8 },
  },
  {
    id:          'trasparenza',
    number:      '03',
    title:       'Trasparenza',
    description: 'Operare con massima apertura verso la cittadinanza: le attività, le deliberazioni e i rendiconti del Forum sono pubblici e accessibili a tutti.',
    accent:      'bg-sky-500/10 border-sky-500/20',
    tag:         'Garanzia istituzionale',
    beam:        { colorFrom: '#38bdf8', colorTo: '#818cf8', duration: 3, delay: 1.5 },
  },
]

const SECONDARY = [
  { title: 'Progetti Europei',  description: 'Partecipare a progetti europei in rete con altri Forum regionali e nazionali.',          icon: '🌍', beam: { colorFrom: '#6366f1', colorTo: '#8b5cf6', duration: 4,   delay: 0   } },
  { title: 'Iniziative Culturali', description: 'Organizzare eventi e manifestazioni di valorizzazione del territorio.',               icon: '🎭', beam: { colorFrom: '#a78bfa', colorTo: '#4ade80', duration: 4.5, delay: 0.5 } },
  { title: 'Politiche Giovanili',  description: 'Formulare proposte alla Giunta Comunale su tematiche di interesse giovanile.',       icon: '⚖️', beam: { colorFrom: '#22d3ee', colorTo: '#6366f1', duration: 3.5, delay: 1   } },
  { title: 'Formazione Civica',    description: 'Promuovere percorsi di educazione civica, culturale e professionale.',               icon: '📚', beam: { colorFrom: '#4ade80', colorTo: '#a78bfa', duration: 5,   delay: 1.5 } },
]

export default function Principles() {
  const [ref, isVisible] = useReveal()

  return (
    <section id="principles" className="py-32 section-glow-center">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Finalità</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            I Principi del Forum
          </h2>
          <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
            Valori fondamentali sanciti nello Statuto e nella Carta Europea
            della Partecipazione dei Giovani.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>

          {/* Row 1 — main 3-col bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

            {/* Democrazia — col-span-2 */}
            <div
              className={`card-beam relative overflow-hidden glass p-8 md:col-span-2 border ${MAIN[0].accent} cursor-default`}
            >
              <BorderBeam {...MAIN[0].beam} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[11px] font-semibold tracking-[0.15em] text-gray-500 uppercase">{MAIN[0].tag}</span>
                  <span className="text-5xl font-black text-white/5">{MAIN[0].number}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{MAIN[0].title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{MAIN[0].description}</p>
                <div className="mt-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-indigo-400 text-xs font-medium">Core value</span>
                </div>
              </div>
            </div>

            {/* Stat card */}
            <div className="card-beam relative overflow-hidden glass p-8 flex flex-col justify-between min-h-[240px] cursor-default">
              <BorderBeam colorFrom="#4ade80" colorTo="#6366f1" duration={6} />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="text-[11px] font-semibold tracking-[0.15em] text-gray-500 uppercase">Partecipazione</div>
                <div>
                  <div className="text-6xl font-black text-gradient mb-3">{STAT.value}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{STAT.label}</p>
                </div>
              </div>
            </div>

            {/* Partecipazione */}
            <div className={`card-beam relative overflow-hidden glass p-7 border ${MAIN[1].accent} cursor-default`}>
              <BorderBeam {...MAIN[1].beam} />
              <div className="relative z-10">
                <div className="text-[11px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4">{MAIN[1].tag}</div>
                <h3 className="text-xl font-bold text-white mb-3">{MAIN[1].title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{MAIN[1].description}</p>
              </div>
            </div>

            {/* Trasparenza */}
            <div className={`card-beam relative overflow-hidden glass p-7 border ${MAIN[2].accent} cursor-default`}>
              <BorderBeam {...MAIN[2].beam} />
              <div className="relative z-10">
                <div className="text-[11px] font-semibold tracking-[0.15em] text-gray-500 uppercase mb-4">{MAIN[2].tag}</div>
                <h3 className="text-xl font-bold text-white mb-3">{MAIN[2].title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{MAIN[2].description}</p>
              </div>
            </div>
          </div>

          {/* Row 2 — 4 secondary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SECONDARY.map(({ title, description, icon, beam }) => (
              <div key={title} className="card-beam relative overflow-hidden glass p-6 cursor-default">
                <BorderBeam {...beam} borderWidth={1} />
                <div className="relative z-10">
                  <div className="text-2xl mb-4" role="img" aria-label={title}>{icon}</div>
                  <h4 className="font-semibold text-white text-sm mb-2">{title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
