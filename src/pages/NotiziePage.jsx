import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import SubPageLayout from '../components/SubPageLayout'
import CommentiSection from '../components/CommentiSection'

function ArticleModal({ article, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10"
        style={{ background: '#111' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              {article.category && (
                <span className="inline-block text-[10px] text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full mb-3">
                  {article.category}
                </span>
              )}
              <h2 className="text-white text-2xl font-bold leading-tight">{article.title}</h2>
              <p className="text-gray-500 text-sm mt-1">{article.date}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {article.content || article.excerpt}
          </div>
          <CommentiSection articleId={article.id} />
        </div>
      </div>
    </div>
  )
}

export default function NotiziePage() {
  const { content } = useContent()
  const [selected, setSelected] = useState(null)
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('Tutti')

  const published = content.articles.filter(a => a.published)
  const categories = ['Tutti', ...Array.from(new Set(published.map(a => a.category).filter(Boolean)))]

  const filtered = published.filter(a => {
    const matchCat  = filter === 'Tutti' || a.category === filter
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || (a.excerpt || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <SubPageLayout>
      <div className="pt-8 pb-24 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Aggiornamenti</span>
            <div className="h-px w-12 bg-indigo-500/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Notizie</h1>
          <p className="text-gray-500 text-base max-w-xl">
            Tutti gli aggiornamenti e le comunicazioni del Forum dei Giovani di Lacedonia.
          </p>
        </div>

        {/* Filtri e ricerca */}
        {published.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cerca articolo..."
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

        {/* Griglia */}
        {published.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 text-sm">Nessun articolo pubblicato al momento.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 text-sm">Nessun risultato per la ricerca.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(art => (
              <button
                key={art.id}
                onClick={() => setSelected(art)}
                className="glass glass-hover text-left p-6 rounded-2xl flex flex-col gap-3 group"
              >
                {art.category && (
                  <span className="inline-block text-[10px] text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full self-start">
                    {art.category}
                  </span>
                )}
                <h3 className="text-white font-semibold text-base leading-snug group-hover:text-indigo-300 transition-colors">
                  {art.title}
                </h3>
                {art.excerpt && (
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{art.excerpt}</p>
                )}
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-gray-600 text-xs">{art.date}</span>
                  <svg className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
    </SubPageLayout>
  )
}
