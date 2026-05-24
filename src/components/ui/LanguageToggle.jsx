import { useLanguage } from '../../context/LanguageContext'

const LanguageToggle = () => {
  const { isEnglish, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none transition-all duration-300"
      aria-label={isEnglish ? 'Change language to Spanish' : 'Cambiar idioma a inglés'}
      title={isEnglish ? 'Change Language' : 'Cambiar idioma'}
      type="button"
    >
      <span className="text-lg" role="img" aria-hidden="true">
        {isEnglish ? '🇺🇸' : '🇨🇴'}
      </span>
    </button>
  )
}

export default LanguageToggle
