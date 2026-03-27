import { useState } from 'react'
import { ref as dbRef, get, set } from 'firebase/database'
import { db } from '../firebase'
import { useReveal } from '../hooks/useReveal'
import { useContent } from '../context/ContentContext'

async function saveIdea(idea) {
  const snapshot = await get(dbRef(db, 'idee'))
  const idee = snapshot.val() || []
  await set(dbRef(db, 'idee'), [idea, ...idee])
}

export default function Bacheca() {
  const { content } = useContent()
  const bachekaAperta = content.bachekaAperta !== false
  const [ref, isVisible] = useReveal()
  const [nome,  setNome]  = useState('')
  const [testo, setTesto] = useState('')
  const [sent,  setSent]  = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (testo.trim().length < 10) { setError('Scrivi almeno 10 caratteri.'); return }
    setError('')
    await saveIdea({
      id:    Date.now() + Math.random(),
      nome:  nome.trim() || 'Anonimo',
      testo: testo.trim(),
      data:  new Date().toLocaleDateString('it-IT'),
      letta: false,
    })
    setNome('')
    setTesto('')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="bacheca" className="py-32 relative overflow-hidden">

      {/* Glow di sfondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />

      <div
        ref={ref}
        className={`relative max-w-5xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}
      >
        {/* ── Banner invito ── */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden border border-indigo-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.08) 50%, rgba(99,102,241,0.05) 100%)' }}
        >
          {/* Decorazione angolo */}
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            {/* Icona grande */}
            <div
              className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center border border-indigo-500/30"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 100%)' }}
            >
              <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            {/* Testo */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Partecipa</span>
                <div className="h-px w-8 bg-indigo-500/40" />
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{ color: '#a5b4fc', borderColor: 'rgba(99,102,241,0.4)', background: 'rgba(99,102,241,0.15)' }}
                >
                  Le idee vengono lette dal consiglio
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                Hai un'idea per<br className="hidden md:block" /> il Forum?
              </h2>
              <p className="text-gray-400 text-base leading-relaxed max-w-lg">
                Ogni grande progetto inizia da un'idea. Condividi la tua proposta — potresti cambiare qualcosa nel tuo territorio.
              </p>
            </div>

            {/* Freccia decorativa su desktop */}
            <div className="hidden md:flex flex-col items-center text-indigo-500/40">
              <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="max-w-2xl mx-auto">
          {!bachekaAperta ? (
            <div
              className="rounded-2xl p-10 text-center border border-yellow-500/20"
              style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.07) 0%, rgba(202,138,4,0.04) 100%)' }}
            >
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <p className="text-yellow-300 font-bold text-xl mb-2">Temporaneamente sospeso</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                L'invio di idee è momentaneamente disabilitato.<br />Riprova più tardi.
              </p>
            </div>
          ) : sent ? (
            <div
              className="rounded-2xl p-10 text-center border border-green-500/20"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.05) 100%)' }}
            >
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-bold text-xl mb-2">Idea inviata con successo!</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Grazie per il tuo contributo. Il consiglio del Forum leggerà la tua proposta al più presto.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 border border-white/[0.08] space-y-5"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Nome (opzionale)
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Il tuo nome o resta anonimo"
                  maxLength={60}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  La tua idea <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  value={testo}
                  onChange={e => { setTesto(e.target.value); setError('') }}
                  placeholder="Descrivi la tua proposta o suggerimento per il Forum dei Giovani..."
                  rows={5}
                  maxLength={1000}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors resize-none"
                />
                <div className="flex items-center justify-between mt-1.5">
                  {error
                    ? <span className="text-red-400 text-xs">{error}</span>
                    : <span />
                  }
                  <span className="text-gray-700 text-xs ml-auto">{testo.length}/1000</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 35px rgba(99,102,241,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.3)' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Invia la tua idea
              </button>

              <p className="text-center text-gray-600 text-xs">
                Le idee sono private e visibili solo ai membri del Forum.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
