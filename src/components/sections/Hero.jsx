import { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { heroContent } from '../../data/hero'
import { useLanguage } from '../../context/LanguageContext'
import AsciiMorphText from '../ui/AsciiMorphText'
import TypewriterCarousel from '../ui/TypewriterCarousel'
import { stickers as stickerImages } from '../../assets/stickers'

const profileStickers = [
  { id: 1, image: stickerImages[0], initialLeft: 48, initialTop: 26, finalLeft: 5, finalTop: 18, mobileInitialLeft: 38, mobileInitialTop: 24, mobileFinalLeft: 4, mobileFinalTop: 18 },
  { id: 2, image: stickerImages[1], initialLeft: 50, initialTop: 24, finalLeft: 16, finalTop: 13, mobileInitialLeft: 40, mobileInitialTop: 24, mobileFinalLeft: 20, mobileFinalTop: 14 },
  { id: 3, image: stickerImages[2], initialLeft: 48, initialTop: 30, finalLeft: 28, finalTop: 17, mobileInitialLeft: 40, mobileInitialTop: 28, mobileFinalLeft: 36, mobileFinalTop: 16 },
  { id: 4, image: stickerImages[3], initialLeft: 50, initialTop: 30, finalLeft: 72, finalTop: 16, mobileInitialLeft: 42, mobileInitialTop: 28, mobileFinalLeft: 64, mobileFinalTop: 16 },
  { id: 5, image: stickerImages[4], initialLeft: 48, initialTop: 34, finalLeft: 84, finalTop: 13, mobileInitialLeft: 42, mobileInitialTop: 32, mobileFinalLeft: 80, mobileFinalTop: 14 },
  { id: 6, image: stickerImages[5], initialLeft: 50, initialTop: 36, finalLeft: 94, finalTop: 20, mobileInitialLeft: 44, mobileInitialTop: 34, mobileFinalLeft: 92, mobileFinalTop: 20 },
  { id: 7, image: stickerImages[6], initialLeft: 46, initialTop: 44, finalLeft: 7, finalTop: 42, mobileInitialLeft: 38, mobileInitialTop: 42, mobileFinalLeft: 6, mobileFinalTop: 40 },
  { id: 8, image: stickerImages[7], initialLeft: 48, initialTop: 46, finalLeft: 19, finalTop: 50, mobileInitialLeft: 40, mobileInitialTop: 44, mobileFinalLeft: 22, mobileFinalTop: 50 },
  { id: 9, image: stickerImages[8], initialLeft: 50, initialTop: 44, finalLeft: 31, finalTop: 43, mobileInitialLeft: 42, mobileInitialTop: 42, mobileFinalLeft: 38, mobileFinalTop: 42 },
  { id: 10, image: stickerImages[9], initialLeft: 52, initialTop: 44, finalLeft: 69, finalTop: 43, mobileInitialLeft: 44, mobileInitialTop: 42, mobileFinalLeft: 62, mobileFinalTop: 42 },
  { id: 11, image: stickerImages[10], initialLeft: 52, initialTop: 46, finalLeft: 81, finalTop: 50, mobileInitialLeft: 44, mobileInitialTop: 44, mobileFinalLeft: 78, mobileFinalTop: 50 },
  { id: 12, image: stickerImages[11], initialLeft: 54, initialTop: 44, finalLeft: 93, finalTop: 42, mobileInitialLeft: 46, mobileInitialTop: 42, mobileFinalLeft: 94, mobileFinalTop: 40 },
  { id: 13, image: stickerImages[12], initialLeft: 47, initialTop: 62, finalLeft: 6, finalTop: 70, mobileInitialLeft: 38, mobileInitialTop: 58, mobileFinalLeft: 5, mobileFinalTop: 66 },
  { id: 14, image: stickerImages[13], initialLeft: 49, initialTop: 62, finalLeft: 24, finalTop: 78, mobileInitialLeft: 40, mobileInitialTop: 58, mobileFinalLeft: 28, mobileFinalTop: 78 },
  { id: 15, image: stickerImages[14], initialLeft: 51, initialTop: 62, finalLeft: 76, finalTop: 78, mobileInitialLeft: 44, mobileInitialTop: 58, mobileFinalLeft: 72, mobileFinalTop: 78 },
  { id: 16, image: stickerImages[15], initialLeft: 53, initialTop: 62, finalLeft: 94, finalTop: 70, mobileInitialLeft: 46, mobileInitialTop: 58, mobileFinalLeft: 95, mobileFinalTop: 66 },
]

const Hero = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)
  const { language } = useLanguage()
  const content = heroContent[language]
  const rolePrefix = language === 'es' ? 'Soy ' : 'I am a '
  const roles = language === 'es'
    ? ['Ingeniero de Sistemas', 'Desarrollador Full-Stack']
    : ['Systems Engineer', 'Full-Stack Developer']
  const roleLineWidth = `${rolePrefix.trim().length + Math.max(...roles.map((role) => role.length)) + 2}ch`
  const handleIntroComplete = useCallback(() => {
    setIsIntroComplete(true)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false
            return
          }

          const rect = sectionRef.current.getBoundingClientRect()
          const sectionHeight = rect.height
          const windowHeight = window.innerHeight
          const visibleTop = Math.max(0, -rect.top)
          const visibleBottom = Math.min(sectionHeight, windowHeight - rect.top)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          const progress = visibleHeight / windowHeight

          setScrollProgress(Math.min(1, Math.max(0, progress)))
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getStickerStyle = (sticker) => {
    const progress = scrollProgress
    const isMobile = window.innerWidth < 768
    const isVerySmall = window.innerWidth < 375
    const initialLeft = isMobile ? sticker.mobileInitialLeft : sticker.initialLeft
    const initialTop = isMobile ? sticker.mobileInitialTop : sticker.initialTop
    const finalLeft = isMobile ? sticker.mobileFinalLeft : sticker.finalLeft
    const finalTop = isMobile ? sticker.mobileFinalTop : sticker.finalTop
    const left = initialLeft + (finalLeft - initialLeft) * progress
    const top = initialTop + (finalTop - initialTop) * progress
    const scale = isVerySmall ? 0.38 + 0.12 * progress : isMobile ? 0.48 + 0.18 * progress : 0.62 + 0.28 * progress
    const opacity = 0.36 + 0.22 * progress
    const rotation = progress * 20

    return {
      left: `${left}%`,
      top: `${top}%`,
      transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
      opacity,
      transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      willChange: 'transform, opacity',
      width: isVerySmall ? '42px' : isMobile ? '52px' : '86px',
      height: isVerySmall ? '42px' : isMobile ? '52px' : '86px',
      filter: 'drop-shadow(0 4px 8px rgba(255, 194, 209, 0.3))',
    }
  }

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      {isIntroComplete && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {profileStickers.map((sticker) => {
            const isVerySmall = window.innerWidth < 375
            const isMobile = window.innerWidth < 768

            return (
              <img
                key={sticker.id}
                src={sticker.image}
                alt=""
                className="absolute select-none animate-fade-in"
                style={getStickerStyle(sticker)}
                loading={sticker.id <= 4 ? 'eager' : 'lazy'}
                decoding="async"
                width={isVerySmall ? '42' : isMobile ? '52' : '86'}
                height={isVerySmall ? '42' : isMobile ? '52' : '86'}
              />
            )
          })}
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
        {/* Profile Picture */}
        <div className="relative z-0 mb-6 sm:mb-8 flex items-center justify-center animate-slide-up">
          <div className="relative z-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg sm:h-48 sm:w-48 md:h-56 md:w-56">
            <img
              src={content.profileImage}
              alt={content.name}
              className="h-full w-full rounded-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Animated intro */}
        <h1 className="relative z-20 text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-slide-up text-slate-800 dark:text-white">
          <AsciiMorphText
            text="Hi, I'm Juan Pablo"
            onComplete={handleIntroComplete}
          />
        </h1>

        {/* Animated role */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-600 dark:text-gray-400 mb-8 animate-slide-up text-center">
          {isIntroComplete ? (
            <span
              className="inline-flex max-w-full items-baseline justify-center"
              style={{ width: roleLineWidth }}
            >
              <span className="mr-[0.25em] whitespace-nowrap">{rolePrefix.trim()}</span>
              <TypewriterCarousel roles={roles} />
            </span>
          ) : (
            <span className="invisible">I am a Systems Engineer</span>
          )}
        </h2>

        {/* CTA Buttons */}
        <div className="mx-auto flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 mb-10 sm:mb-12 animate-slide-up">
          {content.ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`flex min-h-12 w-full items-center justify-center px-6 py-3 text-center font-medium rounded-lg transition-all duration-300 transform hover:scale-105 sm:w-auto sm:min-w-44 ${
                cta.variant === 'primary'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'glass-effect hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-700 dark:text-white'
              }`}
            >
              {cta.label}
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12 animate-slide-up">
          {content.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
              aria-label={social.label}
            >
              <FontAwesomeIcon icon={social.icon} className="h-6 w-6" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <a
          href={content.scrollTarget}
          className="inline-block text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-all duration-300 animate-bounce"
        >
          <FontAwesomeIcon icon={faArrowDown} className="h-6 w-6" />
        </a>
      </div>
    </section>
  )
}

export default Hero
