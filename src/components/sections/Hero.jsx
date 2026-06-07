import { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { heroContent } from '../../data/hero'
import { useLanguage } from '../../context/LanguageContext'
import AsciiMorphText from '../ui/AsciiMorphText'
import TypewriterCarousel from '../ui/TypewriterCarousel'
import { stickers as stickerImages } from '../../assets/stickers'

const profileStickers = [
  { id: 1, image: stickerImages[0], initialX: -70, initialY: -35, finalX: -170, finalY: -45, mobileInitialX: -48, mobileInitialY: -26, mobileFinalX: -96, mobileFinalY: -38 },
  { id: 2, image: stickerImages[1], initialX: 70, initialY: -32, finalX: 175, finalY: -86, mobileInitialX: 48, mobileInitialY: -24, mobileFinalX: 92, mobileFinalY: -58 },
  { id: 3, image: stickerImages[2], initialX: -62, initialY: 80, finalX: -95, finalY: 132, mobileInitialX: -42, mobileInitialY: 56, mobileFinalX: -78, mobileFinalY: 88 },
  { id: 4, image: stickerImages[3], initialX: 72, initialY: 88, finalX: 162, finalY: 74, mobileInitialX: 46, mobileInitialY: 58, mobileFinalX: 92, mobileFinalY: 62 },
  { id: 5, image: stickerImages[4], initialX: -78, initialY: 40, finalX: -150, finalY: 62, mobileInitialX: -50, mobileInitialY: 28, mobileFinalX: -92, mobileFinalY: 44 },
  { id: 6, image: stickerImages[5], initialX: 68, initialY: 38, finalX: 116, finalY: -144, mobileInitialX: 46, mobileInitialY: 28, mobileFinalX: 78, mobileFinalY: -88 },
  { id: 7, image: stickerImages[6], initialX: -50, initialY: -58, finalX: -134, finalY: -125, mobileInitialX: -34, mobileInitialY: -42, mobileFinalX: -84, mobileFinalY: -82 },
  { id: 8, image: stickerImages[7], initialX: 56, initialY: 70, finalX: 94, finalY: 138, mobileInitialX: 38, mobileInitialY: 48, mobileFinalX: 70, mobileFinalY: 88 },
  { id: 9, image: stickerImages[8], initialX: -52, initialY: 92, finalX: -168, finalY: 86, mobileInitialX: -36, mobileInitialY: 64, mobileFinalX: -96, mobileFinalY: 66 },
  { id: 10, image: stickerImages[9], initialX: 76, initialY: 42, finalX: 158, finalY: -122, mobileInitialX: 48, mobileInitialY: 30, mobileFinalX: 98, mobileFinalY: -76 },
  { id: 11, image: stickerImages[10], initialX: -78, initialY: -20, finalX: 172, finalY: 14, mobileInitialX: -50, mobileInitialY: -14, mobileFinalX: 100, mobileFinalY: 10 },
  { id: 12, image: stickerImages[11], initialX: 42, initialY: -70, finalX: 150, finalY: 118, mobileInitialX: 30, mobileInitialY: -48, mobileFinalX: 94, mobileFinalY: 76 },
  { id: 13, image: stickerImages[12], initialX: -46, initialY: 108, finalX: 118, finalY: -58, mobileInitialX: -30, mobileInitialY: 70, mobileFinalX: 82, mobileFinalY: -44 },
  { id: 14, image: stickerImages[13], initialX: 82, initialY: 16, finalX: -178, finalY: -82, mobileInitialX: 52, mobileInitialY: 14, mobileFinalX: -102, mobileFinalY: -62 },
  { id: 15, image: stickerImages[14], initialX: -38, initialY: 54, finalX: -130, finalY: 118, mobileInitialX: -28, mobileInitialY: 38, mobileFinalX: -82, mobileFinalY: 76 },
  { id: 16, image: stickerImages[15], initialX: 50, initialY: -44, finalX: -172, finalY: 48, mobileInitialX: 34, mobileInitialY: -32, mobileFinalX: -96, mobileFinalY: 36 },
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
    const initialX = isMobile ? sticker.mobileInitialX : sticker.initialX
    const initialY = isMobile ? sticker.mobileInitialY : sticker.initialY
    const finalX = isMobile ? sticker.mobileFinalX : sticker.finalX
    const finalY = isMobile ? sticker.mobileFinalY : sticker.finalY
    const constrainedFinalX = isVerySmall
      ? Math.max(-90, Math.min(90, finalX * 0.85))
      : isMobile
        ? Math.max(-110, Math.min(110, finalX))
        : finalX
    const constrainedFinalY = isVerySmall ? finalY * 0.8 : finalY
    const x = initialX + (constrainedFinalX - initialX) * progress
    const y = initialY + (constrainedFinalY - initialY) * progress
    const scale = isVerySmall ? 0.4 + 0.15 * progress : isMobile ? 0.55 + 0.2 * progress : 0.7 + 0.35 * progress
    const opacity = 0.9 + 0.1 * progress
    const rotation = progress * 20

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
      opacity,
      transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      willChange: 'transform, opacity',
      width: isVerySmall ? '38px' : isMobile ? '46px' : '58px',
      height: isVerySmall ? '38px' : isMobile ? '46px' : '58px',
      filter: 'drop-shadow(0 4px 8px rgba(255, 194, 209, 0.3))',
    }
  }

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        {/* Profile Picture */}
        <div className="relative mb-8 flex items-center justify-center animate-slide-up">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {profileStickers.map((sticker) => {
              const isVerySmall = window.innerWidth < 375
              const isMobile = window.innerWidth < 768

              return (
                <img
                  key={sticker.id}
                  src={sticker.image}
                  alt=""
                  className="absolute z-0 select-none"
                  style={getStickerStyle(sticker)}
                  loading={sticker.id <= 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  width={isVerySmall ? '38' : isMobile ? '46' : '58'}
                  height={isVerySmall ? '38' : isMobile ? '46' : '58'}
                />
              )
            })}
          </div>
          <img
            src={content.profileImage}
            alt={content.name}
            className="relative z-10 w-32 h-32 sm:w-56 sm:h-56 rounded-full mx-auto hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Animated intro */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-slide-up text-slate-800 dark:text-white">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
          {content.ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`px-8 py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
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
