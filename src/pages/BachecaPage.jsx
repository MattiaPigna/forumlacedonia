import SubPageLayout from '../components/SubPageLayout'
import EventiSection from '../components/EventiSection'
import DocumentiSection from '../components/DocumentiSection'
import SondaggiSection from '../components/SondaggiSection'

export default function BachecaPage() {
  return (
    <SubPageLayout>
      <div className="pt-8">
        {/* Header pagina */}
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Partecipa</span>
            <div className="h-px w-12 bg-indigo-500/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Bacheca</h1>
          <p className="text-gray-500 text-base max-w-xl">
            Calendario degli eventi, sondaggi attivi e tutto quello che succede nel Forum dei Giovani di Lacedonia.
          </p>
        </div>

        <EventiSection />
        <DocumentiSection />
        <SondaggiSection />

        {/* CTA proponi idea */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div
            className="rounded-2xl p-8 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)' }}
          >
            <div>
              <p className="text-white font-bold text-lg mb-1">Hai un'idea per il Forum?</p>
              <p className="text-gray-500 text-sm">Condividila con il consiglio direttamente dalla homepage.</p>
            </div>
            <a
              href="/#bacheca"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all"
              style={{ background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Proponi un'idea
            </a>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
