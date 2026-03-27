import { useState, useEffect } from 'react'

const CANDIDATURE_URL = 'https://sign-here-easily.lovable.app/'

const NAV_LINKS_DESKTOP = [
  { label: 'Chi Siamo',  href: '/chi-siamo'  },
  { label: 'Notizie',    href: '/notizie'    },
  { label: 'Bacheca',    href: '/bacheca'    },
  { label: 'Contattaci', href: '/#contact'   },
  { label: 'Candidati',  href: null          }, // placeholder per CTA
]

const NAV_LINKS_MOBILE = [
  { label: 'Chi Siamo',    href: '/chi-siamo'    },
  { label: 'Officine',     href: '/officine'     },
  { label: 'Notizie',      href: '/notizie'      },
  { label: 'Bacheca',      href: '/bacheca'      },
  { label: 'Sondaggi',     href: '/sondaggi'    },
  { label: 'Eventi',       href: '/eventi'        },
  { label: 'Documenti',    href: '/documenti'    },
  { label: 'Regolamento',  href: '/regolamento'  },
  { label: 'FAQ',          href: '/#faq'         },
  { label: 'Contattaci',   href: '/#contact'     },
]

const ESPLORA_LINKS = [
  { label: 'Officine',    href: '/officine'   },
  { label: 'Regolamento', href: '/regolamento'},
  { label: 'Documenti',   href: '/documenti'  },
  { label: 'Calendario',  href: '/eventi'     },
  { label: 'Sondaggi',    href: '/sondaggi'  },
  { label: 'FAQ',         href: '/#faq'       },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [esploraOpen, setEsploraOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!esploraOpen) return
    function handleClick(e) {
      if (!e.target.closest('[data-esplora]')) setEsploraOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [esploraOpen])

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

        {/* Logo */}
        <a href="/" aria-label="Forum dei Giovani — Home" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-white font-bold text-sm tracking-wide">Forum dei Giovani</span>
          <span className="text-indigo-400 text-xs font-medium">Lacedonia</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS_DESKTOP.filter(l => l.href).map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            >
              {label}
            </a>
          ))}

          {/* Dropdown Esplora */}
          <div className="relative" data-esplora>
            <button
              onClick={() => setEsploraOpen(o => !o)}
              className="flex items-center gap-1 text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              data-esplora
            >
              Esplora
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${esploraOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {esploraOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-44 rounded-xl border border-white/10 py-1 z-50"
                style={{ background: '#111' }}
                data-esplora
              >
                {ESPLORA_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setEsploraOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={CANDIDATURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm flex-shrink-0"
          >
            Candidati
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Menu"
          className="lg:hidden flex flex-col gap-[5px] p-2"
        >
          <span className={`block w-5 h-px bg-white origin-center transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white origin-center transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[700px]' : 'max-h-0'}`}>
        <div className="bg-[#111111] border-t border-white/[0.06] px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS_MOBILE.map(({ label, href }) => (
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
