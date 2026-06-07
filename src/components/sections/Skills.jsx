import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import DomeGallery from '../ui/domegallery'
import { useLanguage } from '../../context/LanguageContext'

const colors = {
  pink: {
    25: '#FEF8FA',
    50: '#FFF5F7',
    500: '#C88B95',
  },
  dark: {
    900: '#0F172A',
  },
  white: '#FFFFFF',
}

const withAlpha = (hex, alpha) => {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const Skills = () => {
  const [scale, setScale] = useState(0.5)
  const sectionRef = useRef(null)
  const domeContainerRef = useRef(null)
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const isDarkMode = resolvedTheme === 'dark'
  const content = {
    en: { title: 'My', highlight: 'Skills' },
    es: { title: 'Mis', highlight: 'Habilidades' },
  }[language]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      let visibilityRatio = 0

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const sectionCenter = rect.top + rect.height / 2
        const windowCenter = windowHeight / 2
        const distanceFromCenter = Math.abs(sectionCenter - windowCenter)
        const maxDistance = windowHeight / 2 + rect.height / 2

        visibilityRatio = 1 - distanceFromCenter / maxDistance
        visibilityRatio = Math.max(0, Math.min(1, visibilityRatio))
        visibilityRatio = visibilityRatio * visibilityRatio * (3 - 2 * visibilityRatio)
      }

      const minScale = 0.5
      const maxScale = 1
      setScale(minScale + (maxScale - minScale) * visibilityRatio)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const sectionBackground = isDarkMode
    ? colors.dark[900]
    : 'linear-gradient(180deg, rgb(254 248 250) 0%, rgb(254 252 253) 30%, rgb(254 252 253) 70%, rgb(255 255 255) 100%)'

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen py-20"
      style={{
        background: sectionBackground,
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <div
        className="absolute left-0 right-0 top-0 pointer-events-none"
        style={{
          height: '300px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${colors.dark[900]} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1,
        }}
      />

      <div className="container relative mx-auto px-6" style={{ zIndex: 2 }}>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            {content.title} <span className="text-gradient">{content.highlight}</span>
          </h2>
          <div className="mx-auto h-1 w-20 bg-blue-500" />
        </div>

        <div
          ref={domeContainerRef}
          className="relative w-full"
          style={{
            height: '600px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <DomeGallery />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDarkMode
                ? `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(colors.dark[900], 0.1)} 70%, ${withAlpha(colors.dark[900], 0.6)} 90%, ${withAlpha(colors.dark[900], 0.8)} 100%)`
                : `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(colors.pink[50], 0.1)} 70%, ${withAlpha(colors.pink[50], 0.6)} 90%, ${withAlpha(colors.pink[50], 0.8)} 100%)`,
              maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Skills
