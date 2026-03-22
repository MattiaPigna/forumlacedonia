import { useReveal } from '../hooks/useReveal'

const PDF_URL = '/Regolamento_ForumDeiGiovani.pdf'

const ARTICLES = [
  {
    num:   'Art. 1',
    title: 'Istituzione',
    text:  'Il Forum dei Giovani è istituito dal Comune di Lacedonia come organo consultivo autonomo di democrazia partecipativa, in attuazione della Carta Europea della Partecipazione dei Giovani.',
    color: 'from-indigo-500/20 to-indigo-500/5',
    border: 'border-indigo-500/30',
    accent: 'text-indigo-400',
  },
  {
    num:   'Art. 2',
    title: 'Finalità',
    text:  'Il Forum promuove la partecipazione attiva dei giovani alla vita pubblica locale, elabora proposte e progetti, e favorisce il dialogo tra le giovani generazioni e le istituzioni.',
    color: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/30',
    accent: 'text-violet-400',
  },
  {
    num:   'Art. 3',
    title: 'Sviluppo Sostenibile',
    text:  'Il Forum si impegna per la tutela dell\'ambiente e la promozione dello sviluppo sostenibile nel territorio di Lacedonia, coinvolgendo i giovani in iniziative ecologiche e di sensibilizzazione.',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-400',
  },
  {
    num:   'Art. 4',
    title: 'Composizione',
    text:  'Sono membri del Forum i giovani tra i 16 e i 34 anni residenti nel Comune di Lacedonia, in possesso dei requisiti previsti dal regolamento e in regola con la quota associativa annua.',
    color: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-400',
  },
  {
    num:   'Art. 5',
    title: 'Organi',
    text:  'Gli organi del Forum sono: l\'Assemblea dei Soci, il Consiglio Direttivo, il Presidente, il Vice Presidente e il Tesoriere. Le cariche durano due anni e sono rinnovabili.',
    color: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
  },
  {
    num:   'Art. 6',
    title: 'Durata',
    text:  'Il Forum dei Giovani ha una durata pari al mandato dell\'Amministrazione Comunale. Il Comune ne garantisce il funzionamento attraverso una sede fisica attrezzata e un Responsabile del Procedimento dedicato.',
    color: 'from-rose-500/20 to-rose-500/5',
    border: 'border-rose-500/30',
    accent: 'text-rose-400',
  },
]

export default function Regolamento() {
  const [ref, isVisible] = useReveal()

  return (
    <section id="regolamento" className="py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}
      >

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Documenti Ufficiali</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="text-white">Il Regolamento</span><br />
              <span className="text-gradient-indigo">del Forum</span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl leading-relaxed">
              Le norme che disciplinano l'organizzazione e il funzionamento
              del Forum dei Giovani del Comune di Lacedonia.
            </p>
          </div>

          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm text-black transition-all duration-200 flex-shrink-0 self-start md:self-auto"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 0 24px rgba(99,102,241,0.35)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(99,102,241,0.35)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Scarica il PDF
          </a>
        </div>

        {/* ── Griglia articoli ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {ARTICLES.map(({ num, title, text, color, border, accent }) => (
            <div
              key={num}
              className={`glass glass-hover p-6 rounded-2xl border ${border} bg-gradient-to-br ${color}`}
            >
              <div className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 ${accent}`}>
                {num}
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* ── Banner garanzie ── */}
        <div
          className="rounded-2xl p-8 md:p-10 border border-indigo-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-2 h-2 rounded-full bg-indigo-400"
              style={{ boxShadow: '0 0 8px rgba(99,102,241,0.8)' }}
            />
            <span className="text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase">
              Garanzie Istituzionali
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-2 text-sm">Mandato Amministrativo</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Il Forum rimane operativo per tutta la durata del mandato dell'Amministrazione Comunale in carica.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2 text-sm">Sede Fisica</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Il Comune mette a disposizione una sede fisica attrezzata con computer e stampante per le attività del Forum.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2 text-sm">Supporto Comunale</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Un Responsabile del Procedimento comunale è dedicato esclusivamente al supporto delle attività del Forum.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
