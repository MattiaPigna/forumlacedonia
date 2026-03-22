import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Principles     from './components/Principles'
import CreativeLab    from './components/CreativeLab'
import FAQ            from './components/FAQ'
import Regolamento    from './components/Regolamento'
import ContactSection from './components/ContactSection'
import Footer         from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Principles />
      <CreativeLab />
      <FAQ />
      <Regolamento />
      <ContactSection />
      <Footer />
    </div>
  )
}
