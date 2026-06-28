import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageToggle from '../ui/LanguageToggle'
import { navLinks } from '../../data/navigation'
import { useLanguage } from '../../context/LanguageContext'
import { profile } from '../../data/profile'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-dark-card/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="group flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 transition-transform duration-300 hover:scale-105"
            aria-label="Juan Pablo"
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="h-full w-full rounded-full object-cover"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8">
            {navLinks[language].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-white/10 focus:outline-none transition-all duration-300"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 glass-effect">
          {navLinks[language].map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <div className="px-3 py-2 flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
