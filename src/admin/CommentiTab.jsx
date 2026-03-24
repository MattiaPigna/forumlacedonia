import { useState } from 'react'
import { useContent } from '../context/ContentContext'

const COMMENTI_KEY = 'forum_commenti'

function loadCommenti() {
  try { return JSON.parse(localStorage.getItem(COMMENTI_KEY) || '[]') } catch { return [] }
}

function saveCommenti(commenti) {
  localStorage.setItem(COMMENTI_KEY, JSON.stringify(commenti))
}

export default function CommentiTab() {
  const { content } = useContent()
  const [commenti, setCommenti] = useState(loadCommenti)

  const inAttesa  = commenti.filter(c => !c.approved)
  const approvati = commenti.filter(c => c.approved)

  function getArticleTitle(articleId) {
    const art = (content.articles || []).find(a => String(a.id) === String(articleId))
    return art ? art.title : `Articolo #${articleId}`
  }

  function approva(id) {
    const updated = commenti.map(c => c.id === id ? { ...c, approved: true } : c)
    saveCommenti(updated)
    setCommenti(updated)
  }

  function elimina(id) {
    if (!confirm('Eliminare questo commento?')) return
    const updated = commenti.filter(c => c.id !== id)
    saveCommenti(updated)
    setCommenti(updated)
  }

  function CommentoRow({ c, showApprove = false }) {
    return (
      <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-white text-sm font-medium">{c.author}</span>
            <span className="text-gray-600 text-xs">{c.date}</span>
            <span className="text-[10px] text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-full truncate max-w-[140px]">
              {getArticleTitle(c.articleId)}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{c.text}</p>
        </div>
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          {showApprove && (
            <button
              onClick={() => approva(c.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-colors"
            >
              Approva
            </button>
          )}
          <button
            onClick={() => elimina(c.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
          >
            Elimina
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {/* In attesa */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-white font-semibold text-lg">In attesa di moderazione</h2>
          {inAttesa.length > 0 && (
            <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {inAttesa.length}
            </span>
          )}
        </div>

        {inAttesa.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
            <p className="text-gray-600 text-sm">Nessun commento in attesa.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inAttesa.map(c => (
              <CommentoRow key={c.id} c={c} showApprove />
            ))}
          </div>
        )}
      </div>

      {/* Approvati */}
      {approvati.length > 0 && (
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">
            Commenti approvati
            <span className="ml-2 text-xs text-gray-500 font-normal">({approvati.length})</span>
          </h2>
          <div className="space-y-3">
            {approvati.map(c => (
              <CommentoRow key={c.id} c={c} showApprove={false} />
            ))}
          </div>
        </div>
      )}

      {commenti.length === 0 && (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <div className="text-4xl mb-3">💬</div>
          <p className="text-gray-500 text-sm">Nessun commento ricevuto ancora.</p>
        </div>
      )}
    </div>
  )
}
