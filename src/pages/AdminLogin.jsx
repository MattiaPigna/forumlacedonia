import { useState, useEffect } from 'react'

const DEFAULT_PW_HASH = '7f6e0a15a1b2c3d4e5f6a7b8c9d0e1f2' // placeholder, vedi sotto
const ATTEMPTS_KEY    = 'forum_admin_attempts'
const MAX_ATTEMPTS    = 5
const LOCKOUT_MS      = 30 * 60 * 1000 // 30 minuti

/* Hashing SHA-256 via Web Crypto API (built-in nel browser) */
async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function getAttempts() {
  try { return JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{"count":0,"lockedUntil":0}') }
  catch { return { count: 0, lockedUntil: 0 } }
}
function saveAttempts(data) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(data))
}
function resetAttempts() {
  localStorage.removeItem(ATTEMPTS_KEY)
}

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [locked,   setLocked]   = useState(false)
  const [remaining, setRemaining] = useState(0) // secondi rimasti al lockout

  /* Aggiorna countdown ogni secondo se bloccato */
  useEffect(() => {
    const att = getAttempts()
    const now = Date.now()
    if (att.lockedUntil > now) {
      setLocked(true)
      setRemaining(Math.ceil((att.lockedUntil - now) / 1000))
    }
  }, [])

  useEffect(() => {
    if (!locked) return
    const timer = setInterval(() => {
      const att = getAttempts()
      const now = Date.now()
      if (att.lockedUntil <= now) {
        resetAttempts()
        setLocked(false)
        setRemaining(0)
        clearInterval(timer)
      } else {
        setRemaining(Math.ceil((att.lockedUntil - now) / 1000))
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [locked])

  async function handleSubmit(e) {
    e.preventDefault()
    if (locked) return

    const att = getAttempts()
    if (att.lockedUntil > Date.now()) {
      setLocked(true)
      return
    }

    setLoading(true)
    setError('')

    /* Legge hash salvato, oppure genera quello della password di default */
    let storedHash = localStorage.getItem('forum_admin_pw_hash')
    if (!storedHash) {
      // Prima volta: salva l'hash della password di default
      storedHash = await sha256('forum2024')
      localStorage.setItem('forum_admin_pw_hash', storedHash)
      // Rimuovi eventuale vecchio campo in chiaro
      localStorage.removeItem('forum_admin_pw')
    }

    const inputHash = await sha256(password)

    if (inputHash === storedHash) {
      resetAttempts()
      sessionStorage.setItem('forum_admin_auth', '1')
      setLoading(false)
      onLogin()
    } else {
      const newCount = att.count + 1
      if (newCount >= MAX_ATTEMPTS) {
        const lockedUntil = Date.now() + LOCKOUT_MS
        saveAttempts({ count: newCount, lockedUntil })
        setLocked(true)
        setRemaining(Math.ceil(LOCKOUT_MS / 1000))
        setError(`Troppi tentativi. Accesso bloccato per 30 minuti.`)
      } else {
        saveAttempts({ count: newCount, lockedUntil: 0 })
        const left = MAX_ATTEMPTS - newCount
        setError(`Password errata. ${left} ${left === 1 ? 'tentativo rimasto' : 'tentativi rimasti'}.`)
      }
      setLoading(false)
    }
  }

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 mb-6">
            <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Accesso Riservato</h1>
          <p className="text-gray-500 text-sm">Forum dei Giovani di Lacedonia</p>
        </div>

        {locked ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <svg className="w-8 h-8 text-red-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-red-400 font-semibold mb-1">Accesso bloccato</p>
            <p className="text-gray-500 text-sm mb-4">
              Troppi tentativi errati. Riprova tra:
            </p>
            <div className="text-3xl font-black text-white tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                autoFocus
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-all ${
                  error
                    ? 'border-red-500/60 focus:border-red-500'
                    : 'border-white/10 focus:border-indigo-500'
                }`}
              />
              {error && (
                <p className="mt-2 text-red-400 text-xs">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
            >
              {loading ? 'Verifica…' : 'Accedi'}
            </button>
          </form>
        )}

        <p className="mt-8 text-center">
          <a href="/" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
            ← Torna al sito
          </a>
        </p>
      </div>
    </div>
  )
}
