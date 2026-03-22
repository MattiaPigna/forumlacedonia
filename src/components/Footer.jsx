import logoImg from '../assets/logo.png'

const CANDIDATURE_URL = 'https://sign-here-easily.lovable.app/'

const NAV_LINKS = [
  { label: 'Chi Siamo',    href: '#about'                            },
  { label: 'Finalità',     href: '#principles'                       },
  { label: 'Lab Creativo', href: '#creative'                         },
  { label: 'FAQ',          href: '#faq'                              },
  { label: 'Regolamento',  href: '#regolamento'                      },
  { label: 'Contattaci',   href: '#contact'                          },
]

const LEGAL_LINKS = [
  { label: 'Regolamento',    href: '/Regolamento_ForumDeiGiovani.pdf', download: true },
  { label: 'Privacy Policy', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Top CTA band ── */}
        <div className="py-16 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/[0.06]">
          <div>
            <p className="text-gray-500 text-sm mb-1">Pronti a partecipare?</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Unisciti al Forum dei Giovani.
            </h3>
          </div>
          <a
            href={CANDIDATURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-3.5 flex-shrink-0"
          >
            Candidati ora →
          </a>
        </div>

        {/* ── Main grid ── */}
        <div className="py-14 grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-5">
              <span className="text-white font-bold text-base tracking-wide">Forum dei Giovani</span>
              <span className="text-indigo-400 text-sm font-medium">Lacedonia</span>
            </a>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-7">
              Organo consultivo di democrazia partecipativa istituito ai sensi della
              Carta Europea della Partecipazione dei Giovani alla Vita Locale e Regionale.
            </p>
            <div className="flex gap-2">
              {[{ s: 'fb', l: 'Facebook' }, { s: 'ig', l: 'Instagram' }].map(({ s, l }) => (
                <a
                  key={s}
                  href="#"
                  aria-label={l}
                  className="w-9 h-9 rounded-lg border border-white/[0.08] hover:border-indigo-500/40 text-gray-500 hover:text-indigo-400 transition-colors duration-200 flex items-center justify-center text-xs font-medium"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] font-bold text-gray-600 tracking-[0.2em] uppercase mb-5">Navigazione</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Docs + contact */}
          <div>
            <h4 className="text-[10px] font-bold text-gray-600 tracking-[0.2em] uppercase mb-5">Documenti</h4>
            <ul className="space-y-3 mb-8">
              {LEGAL_LINKS.map(({ label, href, download }) => (
                <li key={label}>
                  <a
                    href={href}
                    download={download || undefined}
                    target={download ? '_blank' : undefined}
                    rel={download ? 'noopener noreferrer' : undefined}
                    className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="text-[10px] font-bold text-gray-600 tracking-[0.2em] uppercase mb-4">Sede</h4>
            <address className="text-gray-500 text-sm not-italic leading-relaxed">
              Piazza Municipio 1<br />
              83046 Lacedonia (AV)
            </address>
          </div>
        </div>

        {/* ── Bottom ── */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-xs">
            © {year} Forum dei Giovani — Comune di Lacedonia. Tutti i diritti riservati.
          </p>
          <p className="text-gray-800 text-xs text-center">
            Istituito ai sensi della Carta Europea della Partecipazione dei Giovani · Conseil de l'Europe
          </p>
        </div>
      </div>
    </footer>
  )
}
