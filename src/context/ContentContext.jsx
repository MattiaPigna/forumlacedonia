import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { ref, onValue, set } from 'firebase/database'
import { db } from '../firebase'

const DEFAULT_CONTENT = {
  faqs: [
    {
      id: 1,
      q: 'Chi può candidarsi al Forum dei Giovani?',
      a: 'Possono candidarsi tutti i giovani che abbiano compiuto i 16 anni e non abbiano ancora compiuto i 35 anni alla data di presentazione della candidatura. È richiesta la residenza nel Comune di Lacedonia, la cittadinanza italiana o di uno Stato UE (oppure permesso di soggiorno valido) e il godimento dei diritti civili.',
    },
    {
      id: 2,
      q: 'Qual è il requisito di residenza?',
      a: 'Per partecipare al Forum è necessario essere residenti nel Comune di Lacedonia. Possono partecipare come uditori — senza diritto di voto — anche giovani domiciliati nel Comune o che vi frequentino un istituto scolastico o un luogo di lavoro.',
    },
    {
      id: 3,
      q: 'Quanto dura il mandato dei membri eletti?',
      a: 'Il mandato dei componenti del Forum ha durata biennale (2 anni). Le cariche istituzionali — Presidente, Vice Presidente, Tesoriere, Segretario — sono rinnovabili per un massimo di due mandati consecutivi.',
    },
    {
      id: 4,
      q: 'Come funziona il processo di candidatura?',
      a: "La candidatura avviene tramite il modulo ufficiale disponibile sul sito del Comune di Lacedonia o presso l'ufficio comunale. Occorre allegare copia del documento d'identità, codice fiscale e una breve lettera di presentazione. Puoi anche candidarti direttamente tramite il link dedicato.",
    },
    {
      id: 5,
      q: 'Con quale frequenza si riunisce il Forum?',
      a: "L'Assemblea si riunisce in seduta ordinaria almeno una volta ogni due mesi. Le sedute straordinarie possono essere convocate dal Presidente o su richiesta di almeno un terzo dei membri. Tutte le sedute sono pubbliche.",
    },
    {
      id: 6,
      q: 'Il Forum ha poteri deliberativi vincolanti?',
      a: 'Il Forum ha natura consultiva. Può formulare proposte, pareri e raccomandazioni agli organi del Comune. La Giunta Comunale è tenuta a prenderne atto e rispondere motivatamente entro 60 giorni.',
    },
  ],
  stats: [
    { id: 1, value: '16–34', label: 'Anni per candidarsi' },
    { id: 2, value: '2',     label: 'Anni di mandato' },
    { id: 3, value: '5',     label: 'Laboratori creativi' },
    { id: 4, value: 'Free',  label: 'Partecipazione gratuita' },
  ],
  contacts: {
    email: 'candidaturaforum@gmail.com',
    address: 'Piazza Municipio 1 — 83046 Lacedonia (AV)',
    waLinks: [
      { id: 1, label: 'Forum dei Giovani', url: 'https://wa.me/393292412021', subtitle: '+39 329 241 2021', type: 'direct' },
      { id: 2, label: 'Canale WhatsApp Comune di Lacedonia', url: 'https://whatsapp.com/channel/0029VbAeczMJUM2RgxolNg1n', subtitle: 'Resta aggiornato su tutte le novità del Forum', type: 'channel' },
    ],
  },
  articles: [],
  bachekaAperta: true,
  candidaturaAttiva: true,
  theme: { accent1: '#6366f1', accent2: '#8b5cf6', accent3: '#4ade80', accent4: '#22d3ee', accent5: '#a78bfa' },
  iscritti: 0,
  eventi: [],
  documenti: [],
  sondaggi: [],
}

const STORAGE_KEY = 'forum_content'

function loadLocalContent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        ...DEFAULT_CONTENT,
        ...parsed,
        contacts: { ...DEFAULT_CONTENT.contacts, ...(parsed.contacts || {}) },
        theme: { ...DEFAULT_CONTENT.theme, ...(parsed.theme || {}) },
      }
    }
  } catch { /* ignore */ }
  return DEFAULT_CONTENT
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadLocalContent)
  const [ready, setReady] = useState(false)

  // Sync da Firebase → stato locale
  useEffect(() => {
    const dbRef = ref(db, 'content')
    const unsub = onValue(dbRef, snapshot => {
      const data = snapshot.val()
      if (data) {
        const merged = {
          ...DEFAULT_CONTENT,
          ...data,
          contacts: { ...DEFAULT_CONTENT.contacts, ...(data.contacts || {}) },
          theme: { ...DEFAULT_CONTENT.theme, ...(data.theme || {}) },
        }
        setContent(merged)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      }
      setReady(true)
    })
    return () => unsub()
  }, [])

  // Scrivi su Firebase (il listener aggiorna lo stato automaticamente)
  const updateContent = useCallback((key, value) => {
    setContent(prev => {
      const next = { ...prev, [key]: value }
      set(ref(db, 'content'), next)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return (
    <ContentContext.Provider value={{ content, updateContent, ready }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  return ctx
}
