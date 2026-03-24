import Footer from './Footer'

export default function SubPageLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Mini navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06] py-3">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </a>
          <div className="h-4 w-px bg-white/10" />
          <a href="/" className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm">Forum dei Giovani</span>
            <span className="text-indigo-400 text-xs font-medium">Lacedonia</span>
          </a>
          <div className="ml-auto hidden sm:flex items-center gap-5">
            <a href="/chi-siamo"  className="text-gray-500 hover:text-white text-xs transition-colors">Chi Siamo</a>
            <a href="/officine"   className="text-gray-500 hover:text-white text-xs transition-colors">Officine</a>
            <a href="/notizie"    className="text-gray-500 hover:text-white text-xs transition-colors">Notizie</a>
            <a href="/regolamento" className="text-gray-500 hover:text-white text-xs transition-colors">Regolamento</a>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <Footer />
    </div>
  )
}
