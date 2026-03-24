import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import SubPageLayout from '../components/SubPageLayout'

export default function DocumentiPage() {
  const { content } = useContent()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Tutti')

  const published = (content.documenti || []).filter(d => d.published)
  const categories = ['Tutti', ...Array.from(new Set(published.map(d => d.category).filter(Boolean)))]

  const filtered = published.filter(d => {
    const matchCat = filter === 'Tutti' || d.category === filter
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || (d.description || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <SubPageLayout>
      <div className="pt-8 pb-24 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Risorse</span>
            <div className="h-px w-12 bg-indigo-500/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Archivio Documenti</h1>
          <p className="text-gray-500 text-base max-w-xl">
            Materiali ufficiali, regolamenti e risorse del Forum dei Giovani di Lacedonia.
          </p>
        </div>

        {/* Filtri */}
        {published.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cerca documento..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors"
            />
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    filter === cat
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-gray-500 border border-white/10 hover:text-gray-300 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {published.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-gray-600 text-sm">Nessun documento disponibile al momento.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 text-sm">Nessun risultato per la ricerca.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(doc => (
              <div key={doc.id} className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4">
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

                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base leading-snug">{doc.title}</h3>
                  {doc.description && (
                    <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-3">{doc.description}</p>
                  )}
                </div>

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
        )}
      </div>
    </SubPageLayout>
  )
}
