import { useState, useEffect } from 'react'
import logoImg from '../assets/logo.png'

const CANDIDATURE_URL = 'https://sign-here-easily.lovable.app/'

const NAV_LINKS = [
  { label: 'Chi Siamo',    href: '#about'        },
  { label: 'Finalità',     href: '#principles'   },
  { label: 'Lab Creativo', href: '#creative'     },
  { label: 'FAQ',          href: '#faq'          },
  { label: 'Regolamento',  href: '#regolamento'  },
]

export default function Navbar() {
  const [isScrolled,  setIsScrolled]  = useState(false)
  const [isMenuOpen,  setIsMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Navigazione principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="#" aria-label="Forum dei Giovani — Home" className="flex items-center gap-2">
          <div
            className="px-2 py-1 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.2) 100%)',
              border: '1px solid rgba(99,102,241,0.3)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <img
              src={logoImg}
              alt="Logo Forum dei Giovani di Lacedonia"
              className="h-8 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,1)) drop-shadow(0 0 1px rgba(255,255,255,1)) drop-shadow(0 0 2px rgba(255,255,255,0.8))' }}
            />
          </div>
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href={CANDIDATURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            Candidati
          </a>
        </div>

        {/* ── Hamburger ── */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Menu"
          className="md:hidden flex flex-col gap-[5px] p-2"
        >
          <span className={`block w-5 h-px bg-white origin-center transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white origin-center transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[400px]' : 'max-h-0'}`}>
        <div className="bg-[#111111] border-t border-white/[0.06] px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400 hover:text-white text-sm font-medium py-3 border-b border-white/[0.06] transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={CANDIDATURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="btn-primary mt-4 justify-center"
          >
            Candidati al Forum
          </a>
        </div>
      </div>
    </nav>
  )
}
