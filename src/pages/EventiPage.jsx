import { useContent } from '../context/ContentContext'
import SubPageLayout from '../components/SubPageLayout'

export default function EventiPage() {
  const { content } = useContent()

  const published = (content.eventi || [])
    .filter(e => e.published)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  function formatDay(dateStr) {
    try {
      const d = new Date(dateStr)
      return {
        day: d.getDate(),
        month: d.toLocaleString('it-IT', { month: 'short' }).toUpperCase(),
        full: d.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      }
    } catch { return { day: '—', month: '—', full: dateStr } }
  }

  return (
    <SubPageLayout>
      <div className="pt-8 pb-24 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Calendario</span>
            <div className="h-px w-12 bg-indigo-500/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Calendario Eventi</h1>
          <p className="text-gray-500 text-base max-w-xl">
            Tutti gli appuntamenti, le assemblee e le iniziative del Forum dei Giovani di Lacedonia.
          </p>
        </div>

        {published.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">📅</div>
            <p className="text-gray-600 text-sm">Nessun evento in programma al momento.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {published.map(evento => {
              const { day, month, full } = formatDay(evento.date)
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
                        <span className="text-indigo-400 text-xs mt-1 block">Ore {evento.time}</span>
                      )}
                    </div>
                  </div>

                  {/* Data completa */}
                  <p className="text-gray-600 text-xs capitalize">{full}</p>

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
                    <p className="text-gray-400 text-sm leading-relaxed">{evento.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </SubPageLayout>
  )
}
