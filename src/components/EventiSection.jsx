import { useContent } from '../context/ContentContext'
import { useReveal } from '../hooks/useReveal'

export default function EventiSection() {
  const { content } = useContent()
  const [ref, isVisible] = useReveal()

  const published = (content.eventi || [])
    .filter(e => e.published)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  if (published.length === 0) return null

  function formatDay(dateStr) {
    try {
      const d = new Date(dateStr)
      return { day: d.getDate(), month: d.toLocaleString('it-IT', { month: 'short' }).toUpperCase() }
    } catch { return { day: '—', month: '—' } }
  }

  return (
    <section id="eventi" className="py-32 section-glow-violet">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Calendario</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white">Prossimi Appuntamenti</h2>
            <p className="text-gray-500 text-sm mt-2">Gli eventi in programma del Forum dei Giovani</p>
          </div>
          <a
            href="/eventi"
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
          >
            Vedi tutti gli eventi
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {published.map(evento => {
            const { day, month } = formatDay(evento.date)
            return (
              <div key={evento.id} className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4">
                {/* Badge data */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <span className="text-2xl font-black text-indigo-300 leading-none">{day}</span>
                    <span className="text-[10px] font-bold text-indigo-400 leading-none mt-0.5">{month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base leading-snug">{evento.title}</h3>
                    {evento.time && (
                      <span className="text-indigo-400 text-xs mt-1 block">{evento.time}</span>
                    )}
                  </div>
                </div>

                {/* Luogo */}
                {evento.location && (
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{evento.location}</span>
                  </div>
                )}

                {/* Descrizione */}
                {evento.description && (
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{evento.description}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
