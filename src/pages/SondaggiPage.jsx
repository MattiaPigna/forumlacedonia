import { useState, useEffect } from 'react'
import { ref, onValue, update, increment } from 'firebase/database'
import { db } from '../firebase'
import { useContent } from '../context/ContentContext'
import SubPageLayout from '../components/SubPageLayout'

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
  const opts = sondaggio.options || []

  function handleVote(optId) {
    if (voted || sondaggio.closed) return
    update(ref(db), {
      [`voti/${sid}/${safeId(optId)}`]: increment(1),
      [`votanti/${sid}/${clientId}`]: safeId(optId),
    })
    setVoted(true)
  }

  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block text-[10px] border px-2 py-0.5 rounded-full ${sondaggio.closed ? 'text-yellow-400 border-yellow-500/30' : 'text-violet-400 border-violet-500/30'}`}>
            {sondaggio.closed ? 'Chiuso' : 'Sondaggio attivo'}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg leading-snug">{sondaggio.question}</h3>
        {sondaggio.endDate && (
          <p className="text-gray-600 text-xs mt-1">
            Scade il {new Date(sondaggio.endDate).toLocaleDateString('it-IT')}
          </p>
        )}
      </div>

      {(voted || sondaggio.closed) ? (
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
                    style={{ width: `${perc}%`, background: 'linear-gradient(90deg, var(--accent-1), var(--accent-2))' }}
                  />
                </div>
                <span className="text-gray-600 text-[11px]">{count} {count === 1 ? 'voto' : 'voti'}</span>
              </div>
            )
          })}
          <p className="text-gray-600 text-xs text-center mt-2">
            {totale} {totale === 1 ? 'voto totale' : 'voti totali'}
            {voted && !sondaggio.closed ? ' — Grazie per aver votato!' : ''}
          </p>
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

export default function SondaggiPage() {
  const { content } = useContent()

  const published = (content.sondaggi || []).filter(s => s.published)

  return (
    <SubPageLayout>
      <div className="pt-8 pb-24 max-w-6xl mx-auto px-6">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Partecipa</span>
            <div className="h-px w-12 bg-indigo-500/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Sondaggi</h1>
          <p className="text-gray-500 text-base max-w-xl">
            Esprimi la tua opinione sui temi del Forum dei Giovani di Lacedonia.
          </p>
        </div>

        {published.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-gray-600 text-sm">Nessun sondaggio disponibile al momento.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {published.map(s => (
              <SondaggioCard key={s.id} sondaggio={s} />
            ))}
          </div>
        )}
      </div>
    </SubPageLayout>
  )
}
