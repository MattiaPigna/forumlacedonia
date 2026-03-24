import { useReveal } from '../hooks/useReveal'
import { useContent } from '../context/ContentContext'

const WaIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function ContactSection() {
  const { content }      = useContent()
  const { email, address, waLinks = [] } = content.contacts
  const [ref, isVisible] = useReveal()

  const directLinks  = waLinks.filter(l => l.type === 'direct')
  const channelLinks = waLinks.filter(l => l.type === 'channel')

  return (
    <section id="contact" className="py-32 section-glow-indigo">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}
      >

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Contattaci</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          <span className="text-white">Hai domande?</span><br />
          <span className="text-gradient-indigo">Scrivici.</span>
        </h2>
        <p className="text-gray-500 text-base mb-12 max-w-xl leading-relaxed">
          Puoi raggiungerci via email o direttamente su WhatsApp. Rispondiamo il prima possibile.
        </p>

        {/* ── Bottoni contatto: email + diretti ── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="glass glass-hover flex items-center gap-5 p-6 rounded-2xl group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/25 transition-colors">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-1">Email</div>
              <div className="text-white text-sm font-medium break-all">{email}</div>
            </div>
          </a>

          {/* WhatsApp diretti */}
          {directLinks.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover flex items-center gap-5 p-6 rounded-2xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/25 transition-colors">
                <WaIcon className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-1">WhatsApp</div>
                <div className="text-white text-sm font-medium">{link.label}</div>
                {link.subtitle && <div className="text-gray-500 text-xs mt-0.5">{link.subtitle}</div>}
              </div>
            </a>
          ))}
        </div>

        {/* ── Canali WhatsApp ── */}
        {channelLinks.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-6 p-6 rounded-2xl border border-green-500/25 transition-all duration-200 group mb-4"
            style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.05) 100%)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.25)' }}
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                <WaIcon className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-1">Canale Ufficiale</div>
                <div className="text-white font-semibold text-sm">{link.label}</div>
                {link.subtitle && <div className="text-gray-500 text-xs mt-0.5">{link.subtitle}</div>}
              </div>
            </div>
            <svg className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        ))}

        {/* Sede */}
        <div className="mt-8 text-center">
          <address className="text-gray-600 text-xs not-italic">
            Sede: {address}
          </address>
        </div>

      </div>
    </section>
  )
}
