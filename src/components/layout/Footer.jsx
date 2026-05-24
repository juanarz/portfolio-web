import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../../context/LanguageContext'
import { footerContent } from '../../data/footer'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { language } = useLanguage()
  const content = footerContent[language]

  return (
    <footer className="py-8 px-4 border-t border-slate-300 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-400">
            {content.builtWith}{' '}
            <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> {content.by}{' '}
            <span className="text-slate-800 dark:text-white font-semibold">Juan Pablo</span>
          </p>
          <p className="text-slate-500 dark:text-gray-500 text-sm mt-2">
            © {currentYear} {content.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
