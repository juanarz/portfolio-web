import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import Experience from './components/sections/Experience'
import SocialStats from './components/ui/SocialStats'

function App() {
  const initialHashRef = useRef(typeof window !== 'undefined' ? window.location.hash : '')
  const [isLoading, setIsLoading] = useState(() => !initialHashRef.current)

  useEffect(() => {
    if (!isLoading) return undefined

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // 5 segundos para que puedas ver el loading

    return () => clearTimeout(timer)
  }, [isLoading])

  useLayoutEffect(() => {
    if (isLoading) return undefined

    const scrollToHash = (behavior = 'smooth') => {
      const hash = window.location.hash || initialHashRef.current
      if (!hash) return

      const target = document.getElementById(hash.slice(1))
      if (!target) return

      const navbarOffset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - navbarOffset
      window.scrollTo({ top: Math.max(top, 0), behavior })
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handleHashChange = () => scrollToHash()
    window.requestAnimationFrame(() => scrollToHash('auto'))
    const initialScrolls = [0, 50, 300, 900, 1800, 3200].map((delay) => window.setTimeout(() => scrollToHash('auto'), delay))
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      initialScrolls.forEach((timer) => window.clearTimeout(timer))
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0a0a0a', 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid #333', 
            borderTop: '3px solid #3b82f6', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Cargando Portafolio...</p>
          <p style={{ fontSize: '16px', marginTop: '10px', opacity: 0.7 }}>
            Preparando contenido
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 dark:bg-dark-bg transition-colors duration-300 fade-in-content">
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <SocialStats />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
