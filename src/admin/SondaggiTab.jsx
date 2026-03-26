import { useState, useEffect } from 'react'
import { ref, onValue, set, remove } from 'firebase/database'
import { useContent } from '../context/ContentContext'
import { db } from '../firebase'

function genId() { return Date.now() + Math.random() }

function SaveBadge({ show }) {
  if (!show) return null
  return (
    <span className="inline-flex items-center gap-1.5 text-green-400 text-xs font-medium animate-pulse">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Salvato
    </span>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors"
    />
  )
}

export default function SondaggiTab() {
  const { content, updateContent } = useContent()
  const [editing, setEditing] = useState(null)
  const [saved, setSaved] = useState(false)
  const [votiTutti, setVotiTutti] = useState({})
  const [form, setForm] = useState({
    question: '', options: [{ id: genId(), text: '' }, { id: genId(), text: '' }], endDate: '', published: true, closed: false, showOnHome: false,
  })

  const sondaggi = content.sondaggi || []

  useEffect(() => {
    const unsub = onValue(ref(db, 'voti'), snapshot => {
      setVotiTutti(snapshot.val() || {})
    })
    return () => unsub()
  }, [])

  function openNew() {
    setForm({ question: '', options: [{ id: genId(), text: '' }, { id: genId(), text: '' }], endDate: '', published: true, closed: false, showOnHome: false })
    setEditing('new')
  }
  function openEdit(s) {
    setForm({ ...s, options: s.options ? [...s.options] : [] })
    setEditing(s)
  }
  function handleSave() {
    const opts = form.options.filter(o => o.text.trim())
    if (opts.length < 2) { alert('Inserisci almeno 2 opzioni.'); return }
    const data = { ...form, options: opts }
    let updated
    if (editing === 'new') {
      updated = [{ ...data, id: genId() }, ...sondaggi]
    } else {
      updated = sondaggi.map(s => s.id === editing.id ? { ...data, id: editing.id } : s)
    }
    updateContent('sondaggi', updated)
    setEditing(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  function handleDelete(id) {
    if (!confirm('Eliminare questo sondaggio?')) return
    updateContent('sondaggi', sondaggi.filter(s => s.id !== id))
  }
  function togglePublished(id) {
    updateContent('sondaggi', sondaggi.map(s => s.id === id ? { ...s, published: !s.published } : s))
  }
  function toggleClosed(id) {
    updateContent('sondaggi', sondaggi.map(s => s.id === id ? { ...s, closed: !s.closed } : s))
  }
  function resetVoti(id) {
    if (!confirm('Azzerare tutti i voti di questo sondaggio?')) return
    remove(ref(db, `voti/${id}`))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function addOption() {
    setForm(f => ({ ...f, options: [...f.options, { id: genId(), text: '' }] }))
  }
  function removeOption(optId) {
    setForm(f => ({ ...f, options: f.options.filter(o => o.id !== optId) }))
  }
  function updateOption(optId, text) {
    setForm(f => ({ ...f, options: f.options.map(o => o.id === optId ? { ...o, text } : o) }))
  }

  if (editing) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white font-semibold">{editing === 'new' ? 'Nuovo Sondaggio' : 'Modifica Sondaggio'}</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          <Field label="Domanda">
            <Input value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} placeholder="La domanda del sondaggio…" />
          </Field>

          <Field label="Opzioni (min. 2)">
            <div className="space-y-2">
              {form.options.map((opt, idx) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <Input
                    value={opt.text}
                    onChange={e => updateOption(opt.id, e.target.value)}
                    placeholder={`Opzione ${idx + 1}`}
                  />
                  {form.options.length > 2 && (
                    <button onClick={() => removeOption(opt.id)} className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0 p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addOption} className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-xs transition-colors mt-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Aggiungi opzione
              </button>
            </div>
          </Field>

          <Field label="Data fine (opzionale)">
            <Input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Visibilità">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.published ? 'bg-indigo-500' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.published ? 'left-5' : 'left-0.5'}`} />
                </div>
                <span className="text-gray-400 text-sm">{form.published ? 'Pubblicato' : 'Bozza'}</span>
              </label>
            </Field>
            <Field label="Stato votazioni">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm(f => ({ ...f, closed: !f.closed }))}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.closed ? 'bg-red-500' : 'bg-green-500'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.closed ? 'left-5' : 'left-0.5'}`} />
                </div>
                <span className="text-gray-400 text-sm">{form.closed ? 'Chiuso' : 'Aperto'}</span>
              </label>
            </Field>
          </div>

          <Field label="Mostra anche in Homepage">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setForm(f => ({ ...f, showOnHome: !f.showOnHome }))}
                className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.showOnHome ? 'bg-amber-500' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.showOnHome ? 'left-5' : 'left-0.5'}`} />
              </div>
              <span className="text-gray-400 text-sm">{form.showOnHome ? 'Visibile in homepage' : 'Solo in bacheca'}</span>
            </label>
            <p className="text-gray-600 text-xs mt-1">Se attivo, questo sondaggio appare anche nella homepage.</p>
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!form.question}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
            >
              Salva
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:border-white/20">
              Annulla
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-semibold text-lg">Sondaggi</h2>
          <p className="text-gray-500 text-xs mt-0.5">{sondaggi.length} sondaggi totali</p>
        </div>
        <div className="flex items-center gap-3">
          <SaveBadge show={saved} />
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuovo
          </button>
        </div>
      </div>

      {sondaggi.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-500 text-sm">Nessun sondaggio ancora.</p>
          <button onClick={openNew} className="mt-4 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
            Crea il primo sondaggio →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sondaggi.map(s => {
            const sVoti = votiTutti[s.id] || {}
            const totale = Object.values(sVoti).reduce((a, b) => a + b, 0)
            return (
              <div key={s.id} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.published && !s.closed ? 'bg-green-400' : s.published && s.closed ? 'bg-yellow-400' : 'bg-gray-500'}`} />
                      <h3 className="text-white text-sm font-medium truncate">{s.question}</h3>
                    </div>
                    <p className="text-gray-600 text-[11px]">{(s.options || []).length} opzioni — {totale} voti totali</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => toggleClosed(s.id)} className={`text-xs px-2 py-1 rounded-lg border transition-colors ${s.closed ? 'text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10' : 'text-green-400 border-green-500/30 hover:bg-green-500/10'}`}>
                      {s.closed ? 'Chiuso' : 'Aperto'}
                    </button>
                    <button onClick={() => togglePublished(s.id)} className={`text-xs px-2 py-1 rounded-lg border transition-colors ${s.published ? 'text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/10' : 'text-gray-500 border-white/10 hover:bg-white/5'}`}>
                      {s.published ? 'Live' : 'Bozza'}
                    </button>
                    <button onClick={() => openEdit(s)} className="text-gray-500 hover:text-white transition-colors p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {totale > 0 && (
                  <div className="space-y-2 mt-3 pt-3 border-t border-white/[0.06]">
                    {(s.options || []).map(opt => {
                      const count = sVoti[opt.id] || 0
                      const perc = totale > 0 ? Math.round((count / totale) * 100) : 0
                      return (
                        <div key={opt.id}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-gray-400 text-xs truncate">{opt.text}</span>
                            <span className="text-gray-500 text-xs ml-2 flex-shrink-0">{count} ({perc}%)</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${perc}%` }} />
                          </div>
                        </div>
                      )
                    })}
                    <button onClick={() => resetVoti(s.id)} className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors">
                      Reset voti
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
