import { useState } from 'react'
import { useContent } from '../context/ContentContext'

const PRESETS = [
  { name: 'Indigo', accent1: '#6366f1', accent2: '#8b5cf6', accent3: '#4ade80', accent4: '#22d3ee', accent5: '#a78bfa' },
  { name: 'Viola',  accent1: '#7c3aed', accent2: '#a855f7', accent3: '#4ade80', accent4: '#22d3ee', accent5: '#c4b5fd' },
  { name: 'Blu',    accent1: '#2563eb', accent2: '#3b82f6', accent3: '#4ade80', accent4: '#06b6d4', accent5: '#93c5fd' },
  { name: 'Verde',  accent1: '#059669', accent2: '#10b981', accent3: '#4ade80', accent4: '#34d399', accent5: '#6ee7b7' },
  { name: 'Rosa',   accent1: '#db2777', accent2: '#ec4899', accent3: '#fb7185', accent4: '#f472b6', accent5: '#fbcfe8' },
  { name: 'Ambra',  accent1: '#d97706', accent2: '#f59e0b', accent3: '#fbbf24', accent4: '#fcd34d', accent5: '#fde68a' },
]

const ACCENT_LABELS = [
  { key: 'accent1', label: 'Accent 1 (principale)' },
  { key: 'accent2', label: 'Accent 2 (secondario)' },
  { key: 'accent3', label: 'Accent 3 (verde CTA)' },
  { key: 'accent4', label: 'Accent 4 (ciano CTA)' },
  { key: 'accent5', label: 'Accent 5 (viola chiaro)' },
]

export default function TemaTab() {
  const { content, updateContent } = useContent()
  const [theme, setTheme] = useState(content.theme || PRESETS[0])
  const [saved, setSaved] = useState(false)

  function applyTheme(t) {
    setTheme(t)
    updateContent('theme', t)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleColorChange(key, value) {
    const updated = { ...theme, [key]: value }
    setTheme(updated)
    updateContent('theme', updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-semibold text-lg">Tema colori</h2>
          <p className="text-gray-500 text-xs mt-0.5">Personalizza la palette del sito</p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-green-400 text-xs font-medium animate-pulse">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Salvato
          </span>
        )}
      </div>

      {/* Preset */}
      <div className="mb-8">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Preset</p>
        <div className="grid grid-cols-3 gap-3">
          {PRESETS.map(preset => {
            const active = theme.accent1 === preset.accent1 && theme.accent2 === preset.accent2
            return (
              <button
                key={preset.name}
                onClick={() => applyTheme(preset)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  active
                    ? 'border-white/30 bg-white/[0.06]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${preset.accent1} 0%, ${preset.accent2} 100%)` }}
                />
                <span className="text-gray-400 text-xs font-medium">{preset.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Personalizzazione fine */}
      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Personalizzazione fine</p>
        <div className="space-y-3">
          {ACCENT_LABELS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <input
                type="color"
                value={theme[key] || '#6366f1'}
                onChange={e => handleColorChange(key, e.target.value)}
                className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent p-0.5"
              />
              <div>
                <span className="text-white text-sm font-medium block">{label}</span>
                <span className="text-gray-600 text-xs">{theme[key] || '#6366f1'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
