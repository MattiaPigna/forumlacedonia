import { useState, useEffect } from 'react'
import { useContent } from '../context/ContentContext'
import TemaTab      from '../admin/TemaTab'
import EventiTab    from '../admin/EventiTab'
import DocumentiTab from '../admin/DocumentiTab'
import SondaggiTab  from '../admin/SondaggiTab'
import CommentiTab  from '../admin/CommentiTab'

/* ── helpers ─────────────────────────────── */
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

/* ── Field component ─────────────────────── */
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
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

/* ── ARTICOLI ────────────────────────────── */
function ArticoliTab() {
  const { content, updateContent } = useContent()
  const [editing, setEditing]      = useState(null) // null | 'new' | article
  const [saved, setSaved]          = useState(false)
  const [form, setForm]            = useState({
    title: '', excerpt: '', content: '', date: '', category: '', published: true,
  })

  function openNew() {
    setForm({ title: '', excerpt: '', content: '', date: new Date().toLocaleDateString('it-IT'), category: '', published: true })
    setEditing('new')
  }
  function openEdit(art) {
    setForm({ ...art })
    setEditing(art)
  }
  function handleSave() {
    let articles
    if (editing === 'new') {
      articles = [{ ...form, id: genId() }, ...content.articles]
    } else {
      articles = content.articles.map(a => a.id === editing.id ? { ...form, id: editing.id } : a)
    }
    updateContent('articles', articles)
    setEditing(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  function handleDelete(id) {
    if (!confirm('Eliminare questo articolo?')) return
    updateContent('articles', content.articles.filter(a => a.id !== id))
  }
  function togglePublished(id) {
    updateContent('articles', content.articles.map(a => a.id === id ? { ...a, published: !a.published } : a))
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
          <h2 className="text-white font-semibold">{editing === 'new' ? 'Nuovo Articolo' : 'Modifica Articolo'}</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          <Field label="Titolo">
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titolo dell'articolo" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Data">
              <Input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="es. 24 marzo 2026" />
            </Field>
            <Field label="Categoria">
              <Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="es. Notizie, Evento…" />
            </Field>
          </div>
          <Field label="Anteprima (breve descrizione)">
            <Textarea rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Breve descrizione mostrata nella card" />
          </Field>
          <Field label="Contenuto completo">
            <Textarea rows={8} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Testo completo dell'articolo…" />
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
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!form.title}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40 transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
            >
              Salva
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:border-white/20 transition-colors">
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
          <h2 className="text-white font-semibold text-lg">Articoli</h2>
          <p className="text-gray-500 text-xs mt-0.5">{content.articles.length} articoli totali</p>
        </div>
        <div className="flex items-center gap-3">
          <SaveBadge show={saved} />
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuovo
          </button>
        </div>
      </div>

      {content.articles.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-gray-500 text-sm">Nessun articolo ancora.</p>
          <button onClick={openNew} className="mt-4 text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
            Crea il primo articolo →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {content.articles.map(art => (
            <div key={art.id} className="flex items-start justify-between gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${art.published ? 'bg-green-400' : 'bg-gray-500'}`} />
                  <h3 className="text-white text-sm font-medium truncate">{art.title}</h3>
                  {art.category && <span className="text-[10px] text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-full flex-shrink-0">{art.category}</span>}
                </div>
                {art.excerpt && <p className="text-gray-500 text-xs truncate">{art.excerpt}</p>}
                <p className="text-gray-600 text-[11px] mt-1">{art.date}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => togglePublished(art.id)} className={`text-xs px-2 py-1 rounded-lg border transition-colors ${art.published ? 'text-green-400 border-green-500/30 hover:bg-green-500/10' : 'text-gray-500 border-white/10 hover:bg-white/5'}`}>
                  {art.published ? 'Live' : 'Bozza'}
                </button>
                <button onClick={() => openEdit(art)} className="text-gray-500 hover:text-white transition-colors p-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(art.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1">
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

/* ── FAQ ─────────────────────────────────── */
function FaqTab() {
  const { content, updateContent } = useContent()
  const [editing, setEditing]      = useState(null)
  const [form, setForm]            = useState({ q: '', a: '' })
  const [saved, setSaved]          = useState(false)

  function save(faqs) {
    updateContent('faqs', faqs)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  function openEdit(faq) { setForm({ q: faq.q, a: faq.a }); setEditing(faq) }
  function openNew()      { setForm({ q: '', a: '' });        setEditing('new') }
  function handleSave() {
    const faqs = editing === 'new'
      ? [...content.faqs, { ...form, id: genId() }]
      : content.faqs.map(f => f.id === editing.id ? { ...form, id: editing.id } : f)
    save(faqs)
    setEditing(null)
  }
  function handleDelete(id) {
    if (!confirm('Eliminare questa FAQ?')) return
    save(content.faqs.filter(f => f.id !== id))
  }
  function moveUp(idx) {
    if (idx === 0) return
    const arr = [...content.faqs]
    ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
    save(arr)
  }
  function moveDown(idx) {
    if (idx === content.faqs.length - 1) return
    const arr = [...content.faqs]
    ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
    save(arr)
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
          <h2 className="text-white font-semibold">{editing === 'new' ? 'Nuova FAQ' : 'Modifica FAQ'}</h2>
        </div>
        <div className="space-y-4 max-w-2xl">
          <Field label="Domanda">
            <Input value={form.q} onChange={e => setForm(f => ({ ...f, q: e.target.value }))} placeholder="La domanda…" />
          </Field>
          <Field label="Risposta">
            <Textarea rows={5} value={form.a} onChange={e => setForm(f => ({ ...f, a: e.target.value }))} placeholder="La risposta…" />
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={!form.q || !form.a} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
              Salva
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10">Annulla</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-semibold text-lg">FAQ</h2>
          <p className="text-gray-500 text-xs mt-0.5">{content.faqs.length} domande</p>
        </div>
        <div className="flex items-center gap-3">
          <SaveBadge show={saved} />
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuova FAQ
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {content.faqs.map((faq, idx) => (
          <div key={faq.id} className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex flex-col gap-1 pt-0.5 flex-shrink-0">
              <button onClick={() => moveUp(idx)} disabled={idx === 0} className="text-gray-600 hover:text-gray-300 disabled:opacity-20 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button onClick={() => moveDown(idx)} disabled={idx === content.faqs.length - 1} className="text-gray-600 hover:text-gray-300 disabled:opacity-20 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{faq.q}</p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{faq.a}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => openEdit(faq)} className="text-gray-500 hover:text-white p-1 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button onClick={() => handleDelete(faq.id)} className="text-gray-600 hover:text-red-400 p-1 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── HERO / NUMERI ───────────────────────── */
function HeroTab() {
  const { content, updateContent } = useContent()
  const [stats, setStats]          = useState(content.stats)
  const [iscritti, setIscritti]    = useState(content.iscritti || 0)
  const [saved, setSaved]          = useState(false)

  function handleChange(id, field, val) {
    setStats(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s))
  }
  function handleSave() {
    updateContent('stats', stats)
    updateContent('iscritti', parseInt(iscritti, 10) || 0)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  function addStat() {
    setStats(prev => [...prev, { id: genId(), value: '', label: '' }])
  }
  function removeStat(id) {
    setStats(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-semibold text-lg">Numeri Hero</h2>
          <p className="text-gray-500 text-xs mt-0.5">I numeri mostrati nella barra statistica in homepage</p>
        </div>
        <SaveBadge show={saved} />
      </div>

      {/* Iscritti */}
      <div className="mb-6 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
          Iscritti al Forum
        </label>
        <Input
          type="number"
          min="0"
          value={iscritti}
          onChange={e => setIscritti(e.target.value)}
          placeholder="0"
        />
        <p className="text-gray-600 text-[11px] mt-1.5">Viene mostrato nella stats bar se &gt; 0, con animazione contatore</p>
      </div>

      <div className="space-y-3 mb-6">
        {stats.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <Input
                value={s.value}
                onChange={e => handleChange(s.id, 'value', e.target.value)}
                placeholder="Valore (es. 16–34)"
              />
              <Input
                value={s.label}
                onChange={e => handleChange(s.id, 'label', e.target.value)}
                placeholder="Etichetta (es. Anni)"
              />
            </div>
            <button onClick={() => removeStat(s.id)} className="text-gray-600 hover:text-red-400 p-1 transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addStat} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 border border-white/10 hover:border-white/20 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Aggiungi
        </button>
        <button onClick={handleSave} className="px-6 py-2 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
          Salva
        </button>
      </div>
    </div>
  )
}

/* ── CONTATTI ────────────────────────────── */
const EMPTY_WA_LINK = { label: '', url: '', subtitle: '', type: 'direct' }

function ContattiTab() {
  const { content, updateContent } = useContent()
  const contacts = content.contacts
  const [email,   setEmail]   = useState(contacts.email   || '')
  const [address, setAddress] = useState(contacts.address || '')
  const [waLinks, setWaLinks] = useState(contacts.waLinks || [])
  const [editingLink, setEditingLink] = useState(null) // null | 'new' | link obj
  const [linkForm,    setLinkForm]    = useState(EMPTY_WA_LINK)
  const [saved, setSaved] = useState(false)

  function saveAll(newWaLinks) {
    updateContent('contacts', { email, address, waLinks: newWaLinks ?? waLinks })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function openNewLink() {
    setLinkForm({ ...EMPTY_WA_LINK })
    setEditingLink('new')
  }
  function openEditLink(link) {
    setLinkForm({ ...link })
    setEditingLink(link)
  }
  function saveLink() {
    if (!linkForm.label || !linkForm.url) return
    let updated
    if (editingLink === 'new') {
      updated = [...waLinks, { ...linkForm, id: genId() }]
    } else {
      updated = waLinks.map(l => l.id === editingLink.id ? { ...linkForm, id: editingLink.id } : l)
    }
    setWaLinks(updated)
    saveAll(updated)
    setEditingLink(null)
  }
  function deleteLink(id) {
    if (!confirm('Eliminare questo link?')) return
    const updated = waLinks.filter(l => l.id !== id)
    setWaLinks(updated)
    saveAll(updated)
  }

  if (editingLink !== null) {
    return (
      <div className="max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setEditingLink(null)} className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white font-semibold">{editingLink === 'new' ? 'Nuovo Link WhatsApp' : 'Modifica Link'}</h2>
        </div>
        <div className="space-y-4">
          <Field label="Tipo">
            <div className="flex gap-3">
              {['direct', 'channel'].map(t => (
                <button
                  key={t}
                  onClick={() => setLinkForm(f => ({ ...f, type: t }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    linkForm.type === t
                      ? 'bg-green-500/15 text-green-300 border-green-500/30'
                      : 'border-white/10 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {t === 'direct' ? '📱 Numero diretto' : '📢 Canale'}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Nome / Etichetta">
            <Input value={linkForm.label} onChange={e => setLinkForm(f => ({ ...f, label: e.target.value }))} placeholder={linkForm.type === 'direct' ? 'Forum dei Giovani' : 'Canale Comune di Lacedonia'} />
          </Field>
          <Field label="URL">
            <Input value={linkForm.url} onChange={e => setLinkForm(f => ({ ...f, url: e.target.value }))} placeholder={linkForm.type === 'direct' ? 'https://wa.me/39...' : 'https://whatsapp.com/channel/...'} />
          </Field>
          <Field label="Testo aggiuntivo (opzionale)">
            <Input value={linkForm.subtitle} onChange={e => setLinkForm(f => ({ ...f, subtitle: e.target.value }))} placeholder={linkForm.type === 'direct' ? '+39 329 000 0000' : 'Descrizione breve'} />
          </Field>
          <button onClick={saveLink} disabled={!linkForm.label || !linkForm.url} className="w-full py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
            Salva link
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">Informazioni di Contatto</h2>
        <SaveBadge show={saved} />
      </div>
      <div className="space-y-4">
        <Field label="Email">
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@esempio.it" />
        </Field>
        <Field label="Indirizzo sede">
          <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Piazza Municipio 1 — Lacedonia" />
        </Field>
        <button onClick={() => saveAll()} className="w-full py-2.5 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
          Salva email e indirizzo
        </button>
      </div>

      {/* ── Link WhatsApp ── */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">Link WhatsApp</h3>
          <button onClick={openNewLink} className="flex items-center gap-1.5 text-xs text-green-400 border border-green-500/30 rounded-lg px-3 py-1.5 hover:bg-green-500/10 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Aggiungi
          </button>
        </div>

        {waLinks.length === 0 && (
          <p className="text-gray-600 text-sm py-4 text-center border border-dashed border-white/10 rounded-xl">Nessun link. Aggiungine uno.</p>
        )}

        <div className="space-y-2">
          {waLinks.map(link => (
            <div key={link.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-lg">{link.type === 'direct' ? '📱' : '📢'}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{link.label}</div>
                <div className="text-gray-600 text-xs truncate">{link.url}</div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => openEditLink(link)} className="p-1.5 text-gray-500 hover:text-white transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button onClick={() => deleteLink(link.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── IDEE BACHECA ────────────────────────── */
const IDEE_KEY = 'forum_idee'

function loadIdee() {
  try { return JSON.parse(localStorage.getItem(IDEE_KEY) || '[]') } catch { return [] }
}

function IdeeTab() {
  const { content, updateContent } = useContent()
  const bachekaAperta = content.bachekaAperta !== false
  const [idee, setIdee] = useState(loadIdee)
  const [selected, setSelected] = useState(null)

  const unread = idee.filter(i => !i.letta).length

  function markRead(id) {
    const updated = idee.map(i => i.id === id ? { ...i, letta: true } : i)
    setIdee(updated)
    localStorage.setItem(IDEE_KEY, JSON.stringify(updated))
  }
  function markUnread(id) {
    const updated = idee.map(i => i.id === id ? { ...i, letta: false } : i)
    setIdee(updated)
    localStorage.setItem(IDEE_KEY, JSON.stringify(updated))
  }
  function deleteIdea(id) {
    if (!confirm('Eliminare questa idea?')) return
    const updated = idee.filter(i => i.id !== id)
    setIdee(updated)
    localStorage.setItem(IDEE_KEY, JSON.stringify(updated))
    if (selected?.id === id) setSelected(null)
  }
  function markAllRead() {
    const updated = idee.map(i => ({ ...i, letta: true }))
    setIdee(updated)
    localStorage.setItem(IDEE_KEY, JSON.stringify(updated))
  }

  if (selected) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white font-semibold">Idea di {selected.nome}</h2>
          {!selected.letta && (
            <span className="text-[10px] text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">Nuova</span>
          )}
        </div>
        <div className="glass rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold">{selected.nome}</span>
            <span className="text-gray-500 text-xs">{selected.data}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.testo}</p>
        </div>
        <div className="flex gap-3">
          {!selected.letta
            ? <button onClick={() => { markRead(selected.id); setSelected(s => ({ ...s, letta: true })) }} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-colors">Segna come letta</button>
            : <button onClick={() => { markUnread(selected.id); setSelected(s => ({ ...s, letta: false })) }} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-500 border border-white/10 hover:text-gray-300 transition-colors">Segna come non letta</button>
          }
          <button onClick={() => deleteIdea(selected.id)} className="py-2.5 px-4 rounded-xl text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors">
            Elimina
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-white font-semibold text-lg">Bacheca Idee</h2>
          {unread > 0 && (
            <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unread} nuove</span>
          )}
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            Segna tutte come lette
          </button>
        )}
      </div>

      {/* Toggle raccolta idee */}
      <div className={`flex items-center justify-between p-4 rounded-xl border mb-6 ${bachekaAperta ? 'border-green-500/20 bg-green-500/5' : 'border-yellow-500/20 bg-yellow-500/5'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${bachekaAperta ? 'bg-green-400' : 'bg-yellow-400'}`} />
          <div>
            <p className="text-white text-sm font-medium">
              {bachekaAperta ? 'Raccolta idee attiva' : 'Raccolta idee sospesa'}
            </p>
            <p className="text-gray-500 text-xs mt-0.5">
              {bachekaAperta ? 'Gli utenti possono inviare idee.' : 'Sul sito appare "Temporaneamente sospeso".'}
            </p>
          </div>
        </div>
        <button
          onClick={() => updateContent('bachekaAperta', !bachekaAperta)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${bachekaAperta ? 'bg-green-500' : 'bg-gray-700'}`}
        >
          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${bachekaAperta ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>

      {idee.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
          <p className="text-gray-600 text-sm">Nessuna idea ricevuta ancora.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {idee.map(idea => (
            <button
              key={idea.id}
              onClick={() => { setSelected(idea); if (!idea.letta) markRead(idea.id) }}
              className={`w-full text-left p-4 rounded-xl border transition-colors group ${
                !idea.letta
                  ? 'border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10'
                  : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!idea.letta ? 'bg-indigo-400' : 'bg-transparent'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-sm font-medium ${!idea.letta ? 'text-white' : 'text-gray-400'}`}>{idea.nome}</span>
                    <span className="text-gray-600 text-xs flex-shrink-0">{idea.data}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">{idea.testo}</p>
                </div>
                <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 flex-shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── IMPOSTAZIONI ────────────────────────── */
function ImpostazioniTab({ onLogout }) {
  const [oldPw, setOldPw]   = useState('')
  const [newPw, setNewPw]   = useState('')
  const [confPw, setConfPw] = useState('')
  const [msg, setMsg]       = useState(null)

  async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  async function handleChangePw(e) {
    e.preventDefault()
    if (newPw.length < 8)  { setMsg({ type: 'error', text: 'La nuova password deve avere almeno 8 caratteri.' }); return }
    if (newPw !== confPw)  { setMsg({ type: 'error', text: 'Le password non coincidono.' }); return }

    // Verifica la password attuale tramite hash
    let storedHash = localStorage.getItem('forum_admin_pw_hash')
    if (!storedHash) storedHash = await sha256('forum2024')
    const oldHash = await sha256(oldPw)
    if (oldHash !== storedHash) { setMsg({ type: 'error', text: 'Password attuale errata.' }); return }

    // Salva il nuovo hash (rimuove eventuale vecchio testo in chiaro)
    const newHash = await sha256(newPw)
    localStorage.setItem('forum_admin_pw_hash', newHash)
    localStorage.removeItem('forum_admin_pw')
    setMsg({ type: 'success', text: 'Password aggiornata con successo.' })
    setOldPw(''); setNewPw(''); setConfPw('')
    setTimeout(() => setMsg(null), 3000)
  }

  function handleExport() {
    const data = localStorage.getItem('forum_content') || '{}'
    const blob = new Blob([data], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'forum_content.json'; a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        JSON.parse(ev.target.result) // validate
        localStorage.setItem('forum_content', ev.target.result)
        setMsg({ type: 'success', text: 'Contenuti importati. Ricarica la pagina.' })
      } catch {
        setMsg({ type: 'error', text: 'File non valido.' })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="max-w-md space-y-8">
      {/* Change password */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-4">Cambia Password</h2>
        <form onSubmit={handleChangePw} className="space-y-3">
          <Field label="Password attuale">
            <input type="password" value={oldPw} onChange={e => setOldPw(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors" />
          </Field>
          <Field label="Nuova password">
            <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors" />
          </Field>
          <Field label="Conferma nuova password">
            <input type="password" value={confPw} onChange={e => setConfPw(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-colors" />
          </Field>
          {msg && (
            <p className={`text-sm ${msg.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{msg.text}</p>
          )}
          <button type="submit" className="w-full py-2.5 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
            Aggiorna password
          </button>
        </form>
      </div>

      {/* Backup */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-1">Backup contenuti</h2>
        <p className="text-gray-500 text-xs mb-4">Esporta o importa tutti i contenuti del sito.</p>
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white border border-white/10 hover:border-white/20 transition-colors">
            Esporta JSON
          </button>
          <label className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white border border-white/10 hover:border-white/20 transition-colors text-center cursor-pointer">
            Importa JSON
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-white/[0.06]">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Esci dal pannello admin
        </button>
      </div>
    </div>
  )
}

/* ── DASHBOARD ROOT ──────────────────────── */
const TABS = [
  { id: 'articoli',    label: 'Articoli',    icon: '📝' },
  { id: 'idee',        label: 'Idee',        icon: '💡' },
  { id: 'faq',         label: 'FAQ',         icon: '❓' },
  { id: 'numeri',      label: 'Numeri',      icon: '🔢' },
  { id: 'contatti',    label: 'Contatti',    icon: '📞' },
  { id: 'tema',        label: 'Tema',        icon: '🎨' },
  { id: 'eventi',      label: 'Eventi',      icon: '📅' },
  { id: 'documenti',   label: 'Documenti',   icon: '📄' },
  { id: 'sondaggi',    label: 'Sondaggi',    icon: '📊' },
  { id: 'commenti',    label: 'Commenti',    icon: '💬' },
  { id: 'impostazioni',label: 'Impostazioni',icon: '⚙️' },
]

function useUnreadIdee() {
  const [count, setCount] = useState(() => {
    try { return JSON.parse(localStorage.getItem(IDEE_KEY) || '[]').filter(i => !i.letta).length } catch { return 0 }
  })
  useEffect(() => {
    const sync = () => {
      try { setCount(JSON.parse(localStorage.getItem(IDEE_KEY) || '[]').filter(i => !i.letta).length) } catch { setCount(0) }
    }
    window.addEventListener('storage', sync)
    const interval = setInterval(sync, 2000)
    return () => { window.removeEventListener('storage', sync); clearInterval(interval) }
  }, [])
  return count
}

const COMMENTI_KEY_ADMIN = 'forum_commenti'

function usePendingCommenti() {
  const [count, setCount] = useState(() => {
    try { return JSON.parse(localStorage.getItem(COMMENTI_KEY_ADMIN) || '[]').filter(c => !c.approved).length } catch { return 0 }
  })
  useEffect(() => {
    const sync = () => {
      try { setCount(JSON.parse(localStorage.getItem(COMMENTI_KEY_ADMIN) || '[]').filter(c => !c.approved).length) } catch { setCount(0) }
    }
    window.addEventListener('storage', sync)
    const interval = setInterval(sync, 2000)
    return () => { window.removeEventListener('storage', sync); clearInterval(interval) }
  }, [])
  return count
}

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('articoli')
  const unreadIdee = useUnreadIdee()
  const pendingCommenti = usePendingCommenti()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0d0d0d] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <span className="text-white font-semibold text-sm">Admin</span>
            <span className="text-gray-500 text-xs ml-2">Forum dei Giovani</span>
          </div>
        </div>
        <a href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-white text-xs transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Vedi sito
        </a>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-52 border-r border-white/[0.06] bg-[#0d0d0d] py-6 hidden md:flex flex-col gap-1 px-3">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                tab === t.id
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              <span className="flex-1">{t.label}</span>
              {t.id === 'idee' && unreadIdee > 0 && (
                <span className="bg-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">{unreadIdee}</span>
              )}
              {t.id === 'commenti' && pendingCommenti > 0 && (
                <span className="bg-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">{pendingCommenti}</span>
              )}
            </button>
          ))}
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden w-full">
          <div className="flex overflow-x-auto border-b border-white/[0.06] px-4 gap-1 py-2">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  tab === t.id ? 'bg-indigo-500/15 text-indigo-300' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {t.icon} {t.label}
                {t.id === 'idee' && unreadIdee > 0 && (
                  <span className="bg-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">{unreadIdee}</span>
                )}
                {t.id === 'commenti' && pendingCommenti > 0 && (
                  <span className="bg-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">{pendingCommenti}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {tab === 'articoli'     && <ArticoliTab />}
          {tab === 'idee'         && <IdeeTab />}
          {tab === 'faq'          && <FaqTab />}
          {tab === 'numeri'       && <HeroTab />}
          {tab === 'contatti'     && <ContattiTab />}
          {tab === 'tema'         && <TemaTab />}
          {tab === 'eventi'       && <EventiTab />}
          {tab === 'documenti'    && <DocumentiTab />}
          {tab === 'sondaggi'     && <SondaggiTab />}
          {tab === 'commenti'     && <CommentiTab />}
          {tab === 'impostazioni' && <ImpostazioniTab onLogout={onLogout} />}
        </main>
      </div>
    </div>
  )
}
