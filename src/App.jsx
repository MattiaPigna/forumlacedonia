import { useState, useEffect } from 'react'
import { ContentProvider } from './context/ContentContext'
import { useContent } from './context/ContentContext'
import AdminLogin      from './pages/AdminLogin'
import AdminDashboard  from './pages/AdminDashboard'
import NotiziePage     from './pages/NotiziePage'
import ChiSiamoPage    from './pages/ChiSiamoPage'
import OfficinePage    from './pages/OfficinePage'
import RegolamentoPage from './pages/RegolamentoPage'
import EventiPage      from './pages/EventiPage'
import DocumentiPage   from './pages/DocumentiPage'
import BachecaPage     from './pages/BachecaPage'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import Principles      from './components/Principles'
import Bacheca         from './components/Bacheca'
import SondaggiSection from './components/SondaggiSection'
import FAQ             from './components/FAQ'
import ContactSection  from './components/ContactSection'
import Footer          from './components/Footer'

function ThemeApplier() {
  const { content } = useContent()
  useEffect(() => {
    const r = document.documentElement
    const t = content.theme || {}
    if (t.accent1) r.style.setProperty('--accent-1', t.accent1)
    if (t.accent2) r.style.setProperty('--accent-2', t.accent2)
    if (t.accent3) r.style.setProperty('--accent-3', t.accent3)
    if (t.accent4) r.style.setProperty('--accent-4', t.accent4)
    if (t.accent5) r.style.setProperty('--accent-5', t.accent5)
  }, [content.theme])
  return null
}

function AdminApp() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('forum_admin_auth') === '1'
  )
  function handleLogout() {
    sessionStorage.removeItem('forum_admin_auth')
    setAuthed(false)
  }
  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />
  return <AdminDashboard onLogout={handleLogout} />
}

function MainApp() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Principles />
      <Bacheca />
      <SondaggiSection homeOnly />
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default function App() {
  const path = window.location.pathname

  return (
    <ContentProvider>
      <ThemeApplier />
      {path === '/gestione-fdg' ? <AdminApp />       :
       path === '/notizie'     ? <NotiziePage />    :
       path === '/chi-siamo'   ? <ChiSiamoPage />   :
       path === '/officine'    ? <OfficinePage />   :
       path === '/regolamento' ? <RegolamentoPage /> :
       path === '/eventi'      ? <EventiPage />     :
       path === '/documenti'   ? <DocumentiPage />  :
       path === '/bacheca'     ? <BachecaPage />    :
       <MainApp />}
    </ContentProvider>
  )
}
