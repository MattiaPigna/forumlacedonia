import { useContent } from '../context/ContentContext'
import { useReveal } from '../hooks/useReveal'

export default function DocumentiSection() {
  const { content } = useContent()
  const [ref, isVisible] = useReveal()

  const published = (content.documenti || []).filter(d => d.published)

  if (published.length === 0) return null

  return (
    <section id="documenti" className="py-32 section-glow-center">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Documenti</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white">Archivio Documenti</h2>
            <p className="text-gray-500 text-sm mt-2">Materiali ufficiali e risorse del Forum</p>
          </div>
          <a
            href="/documenti"
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
          >
            Vedi tutti
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {published.map(doc => (
            <div key={doc.id} className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4">
              {/* Icona PDF + categoria */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                {doc.category && (
                  <span className="inline-block text-[10px] text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full flex-shrink-0">
                    {doc.category}
                  </span>
                )}
              </div>

              {/* Titolo */}
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base leading-snug">{doc.title}</h3>
                {doc.description && (
                  <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-2">{doc.description}</p>
                )}
              </div>

              {/* Footer card */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] mt-auto">
                <span className="text-gray-600 text-xs">{doc.date}</span>
                {doc.fileUrl && (
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-colors"
                  >
                    Apri documento
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
