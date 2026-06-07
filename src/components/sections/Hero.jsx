import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { heroContent } from '../../data/hero'
import { useLanguage } from '../../context/LanguageContext'
import AsciiMorphText from '../ui/AsciiMorphText'
import TypewriterCarousel from '../ui/TypewriterCarousel'

const Hero = () => {
  const { language } = useLanguage()
  const content = heroContent[language]
  const rolePrefix = language === 'es' ? 'Soy ' : 'I am a '
  const roles = language === 'es'
    ? ['Ingeniero de Sistemas', 'Desarrollador Full-Stack']
    : ['Systems Engineer', 'Full-Stack Developer']
  const roleLineWidth = `${rolePrefix.trim().length + Math.max(...roles.map((role) => role.length)) + 2}ch`

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        {/* Profile Picture */}
        <div className="mb-8 animate-slide-up">
          <img
            src={content.profileImage}
            alt={content.name}
            className="w-32 h-32 sm:w-56 sm:h-56 rounded-full mx-auto  hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Animated intro */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-slide-up text-slate-800 dark:text-white">
          <AsciiMorphText text="Hi, I'm Juan Pablo" />
        </h1>

        {/* Animated role */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-600 dark:text-gray-400 mb-8 animate-slide-up text-center">
          <span
            className="inline-flex max-w-full items-baseline justify-center"
            style={{ width: roleLineWidth }}
          >
            <span className="mr-[0.25em] whitespace-nowrap">{rolePrefix.trim()}</span>
            <TypewriterCarousel roles={roles} />
          </span>
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
