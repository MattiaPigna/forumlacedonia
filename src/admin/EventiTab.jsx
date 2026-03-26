import { useState } from 'react'
import { useContent } from '../context/ContentContext'

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

function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      rows={props.rows || 4}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors resize-vertical"
    />
  )
}

export default function EventiTab() {
  const { content, updateContent } = useContent()
  const [editing, setEditing] = useState(null)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', date: '', time: '', location: '', published: true, popup: false,
  })

  const eventi = content.eventi || []

  function openNew() {
    setForm({ title: '', description: '', date: '', time: '', location: '', published: true, popup: false })
    setEditing('new')
  }
  function openEdit(ev) {
    setForm({ ...ev })
    setEditing(ev)
  }
  function handleSave() {
    let updated
    if (editing === 'new') {
      updated = [{ ...form, id: genId() }, ...eventi]
    } else {
      updated = eventi.map(e => e.id === editing.id ? { ...form, id: editing.id } : e)
    }
    updateContent('eventi', updated)
    setEditing(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  function handleDelete(id) {
    if (!confirm('Eliminare questo evento?')) return
    updateContent('eventi', eventi.filter(e => e.id !== id))
  }
  function togglePublished(id) {
    updateContent('eventi', eventi.map(e => e.id === id ? { ...e, published: !e.published } : e))
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
          <h2 className="text-white font-semibold">{editing === 'new' ? 'Nuovo Evento' : 'Modifica Evento'}</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          <Field label="Titolo">
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titolo dell'evento" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Data">
              <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </Field>
            <Field label="Ora">
              <Input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            </Field>
          </div>
          <Field label="Luogo">
            <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="es. Piazza Municipio, Lacedonia" />
          </Field>
          <Field label="Descrizione">
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descrizione dell'evento…" />
          </Field>
          <Field label="Visibilità">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.published ? 'bg-indigo-500' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.published ? 'left-5' : 'left-0.5'}`} />
              </div>
              <span className="text-gray-400 text-sm">{form.published ? 'Pubblicato' : 'Bozza (non visibile)'}</span>
            </label>
          </Field>
          <Field label="Popup all'apertura del sito">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setForm(f => ({ ...f, popup: !f.popup }))}
                className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.popup ? 'bg-violet-500' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.popup ? 'left-5' : 'left-0.5'}`} />
              </div>
              <span className="text-gray-400 text-sm">{form.popup ? 'Appare come popup all\'apertura' : 'Nessun popup'}</span>
            </label>
          </Field>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!form.title}
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
          <h2 className="text-white font-semibold text-lg">Eventi</h2>
          <p className="text-gray-500 text-xs mt-0.5">{eventi.length} eventi totali</p>
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

      {eventi.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <div className="text-4xl mb-3">📅</div>
          <p className="text-gray-500 text-sm">Nessun evento ancora.</p>
          <button onClick={openNew} className="mt-4 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
            Crea il primo evento →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {eventi.map(ev => (
            <div key={ev.id} className="flex items-start justify-between gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${ev.published ? 'bg-green-400' : 'bg-gray-500'}`} />
                  <h3 className="text-white text-sm font-medium truncate">{ev.title}</h3>
                </div>
                <p className="text-gray-500 text-xs">{ev.date}{ev.time ? ` alle ${ev.time}` : ''}{ev.location ? ` — ${ev.location}` : ''}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {ev.popup && (
                  <span className="text-xs px-2 py-1 rounded-lg border text-violet-400 border-violet-500/30">Popup</span>
                )}
                <button onClick={() => togglePublished(ev.id)} className={`text-xs px-2 py-1 rounded-lg border transition-colors ${ev.published ? 'text-green-400 border-green-500/30 hover:bg-green-500/10' : 'text-gray-500 border-white/10 hover:bg-white/5'}`}>
                  {ev.published ? 'Live' : 'Bozza'}
                </button>
                <button onClick={() => openEdit(ev)} className="text-gray-500 hover:text-white transition-colors p-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(ev.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
