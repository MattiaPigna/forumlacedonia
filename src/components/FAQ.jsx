import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const FAQS = [
  {
    q: 'Chi può candidarsi al Forum dei Giovani?',
    a: 'Possono candidarsi tutti i giovani che abbiano compiuto i 16 anni e non abbiano ancora compiuto i 35 anni alla data di presentazione della candidatura. È richiesta la residenza nel Comune di Lacedonia, la cittadinanza italiana o di uno Stato UE (oppure permesso di soggiorno valido) e il godimento dei diritti civili.',
  },
  {
    q: 'Qual è il requisito di residenza?',
    a: 'Per partecipare al Forum è necessario essere residenti nel Comune di Lacedonia. Possono partecipare come uditori — senza diritto di voto — anche giovani domiciliati nel Comune o che vi frequentino un istituto scolastico o un luogo di lavoro.',
  },
  {
    q: 'Quanto dura il mandato dei membri eletti?',
    a: 'Il mandato dei componenti del Forum ha durata biennale (2 anni). Le cariche istituzionali — Presidente, Vice Presidente, Tesoriere, Segretario — sono rinnovabili per un massimo di due mandati consecutivi.',
  },
  {
    q: 'Come funziona il processo di candidatura?',
    a: 'La candidatura avviene tramite il modulo ufficiale disponibile sul sito del Comune di Lacedonia o presso l\'ufficio comunale. Occorre allegare copia del documento d\'identità, codice fiscale e una breve lettera di presentazione. Puoi anche candidarti direttamente tramite il link dedicato.',
  },
  {
    q: 'Con quale frequenza si riunisce il Forum?',
    a: "L'Assemblea si riunisce in seduta ordinaria almeno una volta ogni due mesi. Le sedute straordinarie possono essere convocate dal Presidente o su richiesta di almeno un terzo dei membri. Tutte le sedute sono pubbliche.",
  },
  {
    q: 'Il Forum ha poteri deliberativi vincolanti?',
    a: 'Il Forum ha natura consultiva. Può formulare proposte, pareri e raccomandazioni agli organi del Comune. La Giunta Comunale è tenuta a prenderne atto e rispondere motivatamente entro 60 giorni.',
  },
]

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 text-left group focus:outline-none"
      >
        <span className="text-white font-medium text-base group-hover:text-indigo-300 transition-colors duration-200 pr-8 leading-snug">
          {q}
        </span>
        {/* + / × with rotation */}
        <span
          aria-hidden="true"
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-lg font-thin transition-all duration-300 ${
            isOpen
              ? 'border-indigo-500 text-indigo-400 rotate-45 bg-indigo-500/10'
              : 'border-white/20 text-gray-500 group-hover:border-indigo-500/50 group-hover:text-indigo-400'
          }`}
        >
          +
        </span>
      </button>

      <div className={`accordion-body ${isOpen ? 'open' : ''}`}>
        <div className="accordion-inner">
          <p className="text-gray-400 text-sm leading-relaxed pb-6 pr-12">
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [ref, isVisible]          = useReveal()

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="py-32 section-glow-violet">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-16 reveal ${isVisible ? 'visible' : ''}`}
        >

          {/* ── Sidebar ── */}
          <aside className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase">FAQ</span>
            </div>
            <h2 className="text-4xl font-bold text-gradient mb-4 leading-tight">
              Domande<br />Frequenti
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tutto quello che devi sapere per candidarti e partecipare al Forum dei
              Giovani di Lacedonia.
            </p>

            {/* Contact nudge */}
            <div className="mt-10 glass p-6">
              <div className="text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                Hai ancora dubbi?
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Scrivici e ti risponderemo entro 48 ore lavorative.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-indigo-300 transition-colors"
              >
                Contattaci
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </aside>

          {/* ── Accordion ── */}
          <div className="md:col-span-2">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
