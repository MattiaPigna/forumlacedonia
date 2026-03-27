import { useState, useEffect } from 'react'
import { ref, onValue, update, increment } from 'firebase/database'
import { useContent } from '../context/ContentContext'
import { useReveal } from '../hooks/useReveal'
import { db } from '../firebase'

const safeId = id => String(id).replace(/[.\[\]#$]/g, '_')

function getClientId() {
  let id = localStorage.getItem('forum_client_id')
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('forum_client_id', id)
  }
  return id
}

function SondaggioCard({ sondaggio }) {
  const clientId = getClientId()
  const sid = safeId(sondaggio.id)
  const [voted, setVoted] = useState(false)
  const [sVoti, setSVoti] = useState({})

  useEffect(() => {
    const unsub1 = onValue(ref(db, `voti/${sid}`), snapshot => {
      setSVoti(snapshot.val() || {})
    })
    const unsub2 = onValue(ref(db, `votanti/${sid}/${clientId}`), snapshot => {
      if (snapshot.exists()) setVoted(true)
    })
    return () => { unsub1(); unsub2() }
  }, [sid, clientId])

  const totale = Object.values(sVoti).reduce((a, b) => a + b, 0)

  function handleVote(optId) {
    if (voted || sondaggio.closed) return
    update(ref(db), {
      [`voti/${sid}/${safeId(optId)}`]: increment(1),
      [`votanti/${sid}/${clientId}`]: safeId(optId),
    })
    setVoted(true)
  }

  const opts = sondaggio.options || []

  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-5">
      <div>
        <span className="inline-block text-[10px] text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-full mb-3">
          Sondaggio attivo
        </span>
        <h3 className="text-white font-bold text-lg leading-snug">{sondaggio.question}</h3>
        {sondaggio.endDate && (
          <p className="text-gray-600 text-xs mt-1">
            Scade il {new Date(sondaggio.endDate).toLocaleDateString('it-IT')}
          </p>
        )}
      </div>

      {voted ? (
        <div className="space-y-3">
          {opts.map(opt => {
            const count = sVoti[safeId(opt.id)] || 0
            const perc = totale > 0 ? Math.round((count / totale) * 100) : 0
            return (
              <div key={opt.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-300 text-sm">{opt.text}</span>
                  <span className="text-indigo-300 text-sm font-semibold">{perc}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${perc}%`,
                      background: 'linear-gradient(90deg, var(--accent-1), var(--accent-2))',
                    }}
                  />
                </div>
                <span className="text-gray-600 text-[11px]">{count} {count === 1 ? 'voto' : 'voti'}</span>
              </div>
            )
          })}
          <p className="text-gray-600 text-xs text-center mt-2">{totale} {totale === 1 ? 'voto totale' : 'voti totali'} — Grazie per aver votato!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {opts.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              className="w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-indigo-500/10 hover:border-indigo-500/30 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200"
            >
              {opt.text}
            </button>
          ))}
          <p className="text-gray-600 text-xs text-center mt-2">Clicca un'opzione per votare</p>
        </div>
      )}
    </div>
  )
}

export default function SondaggiSection({ homeOnly = false }) {
  const { content } = useContent()
  const [ref2, isVisible] = useReveal()

  const active = (content.sondaggi || []).filter(s =>
    s.published && !s.closed && (!homeOnly || s.showOnHome)
  )

  if (active.length === 0) return null

  return (
    <section id="sondaggi" className="py-32 section-glow-indigo">
      <div
        ref={ref2}
        className={`max-w-6xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Sondaggi</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-white">La tua opinione conta</h2>
          <p className="text-gray-500 text-sm mt-2">Partecipa ai sondaggi del Forum dei Giovani</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {active.map(s => (
            <SondaggioCard key={s.id} sondaggio={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
