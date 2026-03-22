import { useReveal } from '../hooks/useReveal'

const REQUIREMENTS = [
  'Residenza nel Comune di Lacedonia',
  'Età compresa tra 16 e 34 anni compiuti',
  'Cittadinanza italiana o di Stato UE (o permesso di soggiorno valido)',
  'Godimento dei diritti civili',
]

const PILLARS = [
  {
    title: 'Cos\'è il Forum',
    text:  'Un organo autonomo di democrazia partecipativa che rappresenta i giovani residenti nel Comune di Lacedonia, indipendente dagli organi consiliari.',
    icon:  '◎',
  },
  {
    title: 'La Missione',
    text:  'Favorire la partecipazione attiva, elaborare proposte su tematiche giovanili e costruire ponti con le istituzioni europee.',
    icon:  '◇',
  },
  {
    title: 'Gli Organi',
    text:  'Assemblea dei Soci, Consiglio Direttivo, Presidente, Vice Presidente e Tesoriere. Cariche biennali rinnovabili.',
    icon:  '⬡',
  },
]

const SERVICES = [
  {
    icon: '🏛️',
    title: 'Durata del Forum',
    text:  'Il Forum dei Giovani ha una durata pari al mandato dell\'Amministrazione Comunale in carica.',
  },
  {
    icon: '🖥️',
    title: 'Sede Garantita',
    text:  'Il Comune garantisce al Forum una sede fisica attrezzata con postazione computer e stampante per le attività istituzionali.',
  },
  {
    icon: '👤',
    title: 'Responsabile del Procedimento',
    text:  'Un funzionario comunale dedicato supporta il Forum in tutte le pratiche amministrative e procedurali.',
  },
]

export default function About() {
  const [ref, isVisible] = useReveal()

  return (
    <section id="about" className="py-32 section-glow-violet">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">Chi Siamo</span>
          <div className="h-px w-12 bg-indigo-500/40" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              <span className="text-white">Un'officina di idee</span><br />
              <span className="text-gradient-indigo">per la comunità</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Il Forum dei Giovani del Comune di Lacedonia è istituito ai sensi della{' '}
              <span className="text-gray-200 font-medium">
                Carta Europea della Partecipazione dei Giovani alla Vita Locale e Regionale
              </span>
              , adottata dal Congresso dei Poteri Locali e Regionali d'Europa.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm mb-10">
              La Carta riconosce ai giovani il diritto fondamentale di essere coinvolti
              nelle decisioni che riguardano la loro comunità — dal livello locale
              fino a quello europeo.
            </p>

            {/* Requisiti di ammissione */}
            <div className="glass p-6">
              <div className="text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                Requisiti di Ammissione
              </div>
              <ul className="space-y-3">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Pillars */}
          <div className="flex flex-col gap-4">
            {PILLARS.map(({ title, text, icon }) => (
              <div key={title} className="glass glass-hover p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-lg flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Quote */}
            <div className="glass p-6 border-l-2 border-indigo-500 rounded-l-none">
              <p className="text-gray-300 text-base italic leading-relaxed mb-3">
                "La partecipazione dei giovani non è un privilegio, è un diritto
                che rafforza la democrazia locale."
              </p>
              <cite className="text-indigo-400 text-[11px] font-semibold tracking-wide not-italic uppercase">
                Carta Europea della Partecipazione dei Giovani
              </cite>
            </div>
          </div>
        </div>

        {/* ── Garanzie del Comune ── */}
        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {SERVICES.map(({ icon, title, text }) => (
            <div key={title} className="glass glass-hover p-6 text-center flex flex-col items-center gap-3">
              <span className="text-3xl">{icon}</span>
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
