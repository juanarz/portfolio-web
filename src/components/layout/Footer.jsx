import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 border-t border-slate-300 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-slate-600 dark:text-gray-400">
            Designed & Built with{' '}
            <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> by{' '}
            <span className="text-slate-800 dark:text-white font-semibold">Juan Pablo</span>
          </p>
          <p className="text-slate-500 dark:text-gray-500 text-sm mt-2">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
