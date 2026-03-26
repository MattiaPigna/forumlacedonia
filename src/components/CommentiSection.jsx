import { useState, useEffect } from 'react'
import { ref, onValue, set } from 'firebase/database'
import { db } from '../firebase'

export default function CommentiSection({ articleId }) {
  const [commenti, setCommenti] = useState([])
  const [nome, setNome] = useState('')
  const [testo, setTesto] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsub = onValue(ref(db, 'commenti'), snapshot => {
      setCommenti(snapshot.val() || [])
    })
    return () => unsub()
  }, [])

  const approvati = commenti.filter(c => c.articleId === articleId && c.approved)

  function handleSubmit(e) {
    e.preventDefault()
    if (!testo.trim()) { setError('Inserisci un commento.'); return }
    setError('')
    const newComment = {
      id: Date.now() + Math.random(),
      articleId,
      author: nome.trim() || 'Anonimo',
      text: testo.trim(),
      date: new Date().toLocaleDateString('it-IT'),
      approved: false,
    }
    const updated = [...commenti, newComment]
    set(ref(db, 'commenti'), updated)
    setNome('')
    setTesto('')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div className="mt-8 pt-6 border-t border-white/[0.08]">
      <h3 className="text-white font-semibold text-base mb-5">
        Commenti
        {approvati.length > 0 && (
          <span className="ml-2 text-xs text-gray-500 font-normal">({approvati.length})</span>
        )}
      </h3>

      {approvati.length > 0 ? (
        <div className="space-y-4 mb-6">
          {approvati.map(c => (
            <div key={c.id} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">{c.author}</span>
                <span className="text-gray-600 text-xs">{c.date}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-sm mb-6">Nessun commento ancora. Sii il primo!</p>
      )}

      {sent ? (
        <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-green-400 text-sm">
          Commento inviato! Sarà pubblicato dopo la moderazione.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Il tuo nome (opzionale)"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors"
          />
          <textarea
            value={testo}
            onChange={e => setTesto(e.target.value)}
            placeholder="Scrivi un commento…"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors resize-vertical"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={!testo.trim()}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-40 transition-all"
            style={{ background: 'linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%)' }}
          >
            Invia commento
          </button>
        </form>
      )}
    </div>
  )
}
