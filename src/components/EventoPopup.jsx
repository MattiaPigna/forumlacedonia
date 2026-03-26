import { useState, useEffect } from 'react'
import { useContent } from '../context/ContentContext'

export default function EventoPopup() {
  const { content } = useContent()
  const [evento, setEvento] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const popupEvents = (content.eventi || [])
      .filter(e => e.published && e.popup)
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    if (popupEvents.length === 0) return

    setEvento(popupEvents[0])
    setVisible(true)
  }, [content.eventi])

  function close() {
    setVisible(false)
  }

  if (!visible || !evento) return null

  function formatDate(dateStr) {
    try {
      return new Date(dateStr).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    } catch { return dateStr }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />

      {/* Modal */}
      <div className="relative max-w-md w-full rounded-2xl border border-white/10 bg-[#0f0f1a] shadow-2xl p-8 animate-fade-in">
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Evento in arrivo</span>
          <div className="h-px flex-1 bg-indigo-500/30" />
        </div>

        {/* Data */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-4">
          <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-indigo-300 text-xs font-medium">
            {formatDate(evento.date)}{evento.time ? ` alle ${evento.time}` : ''}
          </span>
        </div>

        {/* Titolo */}
        <h2 className="text-white text-xl font-bold leading-snug mb-3">{evento.title}</h2>

        {/* Luogo */}
        {evento.location && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {evento.location}
          </div>
        )}

        {/* Descrizione */}
        {evento.description && (
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{evento.description}</p>
        )}

        {/* Azioni */}
        <div className="flex gap-3">
          <a
            href="/eventi"
            className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
            onClick={close}
          >
            Vedi tutti gli eventi
          </a>
          <button
            onClick={close}
            className="px-4 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:border-white/20 transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  )
}
