import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useContent } from '../context/ContentContext'

const CANDIDATURE_URL = 'https://sign-here-easily.lovable.app/'

const SUBJECTS = [
  { value: '',            label: 'Seleziona un argomento'  },
  { value: 'candidatura', label: 'Candidatura al Forum'    },
  { value: 'proposta',    label: 'Proposta di progetto'    },
  { value: 'laboratorio', label: 'Laboratorio creativo'    },
  { value: 'info',        label: 'Richiesta informazioni'  },
  { value: 'altro',       label: 'Altro'                   },
]

const CONTACTS = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Sede',
    value: 'Piazza Municipio 1\n83046 Lacedonia (AV)',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'forumgiovani@comune.lacedonia.av.it',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Risposta',
    value: 'Entro 48 ore lavorative',
  },
]

const EMPTY = { name: '', email: '', age: '', subject: '', message: '' }

function validate(d) {
  const e = {}
  if (!d.name.trim())   e.name    = 'Campo obbligatorio'
  if (!d.email.trim())  e.email   = 'Campo obbligatorio'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Email non valida'
  if (!d.subject)       e.subject = 'Seleziona un argomento'
  if (!d.message.trim()) e.message = 'Campo obbligatorio'
  else if (d.message.trim().length < 20) e.message = 'Minimo 20 caratteri'
  return e
}

export default function ContactForm() {
  const [form,        setForm]        = useState(EMPTY)
  const [errors,      setErrors]      = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, isVisible]              = useReveal()
  const { content } = useContent()
  const candidaturaAttiva = !content.candidaturaDisattivata

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsSubmitted(true)
  }

  /* ── Success ── */
  if (isSubmitted) {
    return (
      <section id="contact" className="py-32 section-glow-indigo">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-8 shadow-glow">
            <svg className="w-9 h-9 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Messaggio inviato!</h2>
          <p className="text-gray-400 mb-10 max-w-sm">Grazie per averci scritto. Ti risponderemo entro 48 ore lavorative.</p>
          <button
            onClick={() => { setIsSubmitted(false); setForm(EMPTY); setErrors({}) }}
            className="btn-primary"
          >
            Invia un altro messaggio
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-32 section-glow-indigo">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-16 items-start reveal ${isVisible ? 'visible' : ''}`}
        >

          {/* ── Left ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Contatti</span>
              <div className="h-px w-12 bg-indigo-500/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              <span className="text-gradient">Scrivi al</span><br />
              <span className="text-gradient">Forum</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10 text-sm">
              Hai un'idea, una proposta o vuoi candidarti? Il Forum è sempre aperto
              a nuovi contributi. In alternativa, puoi candidarti direttamente
              tramite il form ufficiale.
            </p>

            {/* Direct candidature CTA */}
            {candidaturaAttiva && (
              <a
                href={CANDIDATURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mb-10 w-fit"
              >
                Candidati direttamente →
              </a>
            )}

            {/* Contact details */}
            <div className="space-y-5">
              {CONTACTS.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400 flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-0.5">{label}</div>
                    <div className="text-gray-300 text-sm whitespace-pre-line">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="glass p-8 space-y-6">

              {/* Name + Age */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-2">
                    Nome e Cognome *
                  </label>
                  <input
                    id="name" name="name" type="text"
                    value={form.name} onChange={handleChange}
                    placeholder="Mario Rossi"
                    className={`input-dark ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="age" className="block text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-2">
                    Età
                  </label>
                  <input
                    id="age" name="age" type="number" min="16" max="34"
                    value={form.age} onChange={handleChange}
                    placeholder="Es. 24"
                    className="input-dark"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-2">
                  Email *
                </label>
                <input
                  id="email" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  placeholder="mario@email.com"
                  className={`input-dark ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-2">
                  Argomento *
                </label>
                <select
                  id="subject" name="subject"
                  value={form.subject} onChange={handleChange}
                  className={`input-dark cursor-pointer ${errors.subject ? 'error' : ''}`}
                >
                  {SUBJECTS.map(({ value, label }) => (
                    <option key={value} value={value} disabled={value === ''} className="bg-[#1a1a1a] text-white">
                      {label}
                    </option>
                  ))}
                </select>
                {errors.subject && <p className="text-red-400 text-[11px] mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-2">
                  Messaggio *
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="Raccontaci la tua idea, candidatura o proposta…"
                  className={`input-dark resize-none ${errors.message ? 'error' : ''}`}
                />
                {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-gray-600 text-xs">* Campi obbligatori</span>
                <button type="submit" className="btn-primary">
                  Invia
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
