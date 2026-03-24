import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useReveal } from '../hooks/useReveal'

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
        </div>
      </div>
    </div>
  )
}

export default function Notizie() {
  const { content }        = useContent()
  const [ref, isVisible]   = useReveal()
  const [selected, setSelected] = useState(null)

  const published = content.articles.filter(a => a.published)
  if (published.length === 0) return null

  return (
    <section id="notizie" className="py-32 section-glow-indigo">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Notizie</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl font-bold text-white">Aggiornamenti</h2>
          <a
            href="/notizie"
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
          >
            Vedi tutte
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {published.map(art => (
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
      </div>

      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
