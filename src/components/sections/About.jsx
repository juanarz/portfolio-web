import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { aboutContent } from '../../data/about'
import { useLanguage } from '../../context/LanguageContext'

const About = () => {
  const { language } = useLanguage()
  const content = aboutContent[language]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {content.sectionTitle} <span className="text-gradient">{content.sectionHighlight}</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-4">
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid gap-6">
            {content.features.map((feature, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={feature.icon}
                        className="h-6 w-6 text-blue-400"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-3 text-blue-400" />
              {content.educationTitle}
            </h3>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.education.map((edu, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all duration-300"
              >
                {/* Logo and Institution */}
                <div className="flex items-start space-x-4 mb-4">
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="w-16 h-16 object-contain rounded-lg bg-white/10 p-2"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="w-16 h-16 object-contain rounded-lg bg-white/10 p-2"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-blue-400 font-medium">{edu.institution}</p>
                  </div>
                </div>

                {/* Field */}
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-2 italic">
                  {edu.field}
                </p>

                {/* Period */}
                <div className="flex items-center text-slate-500 dark:text-gray-400 text-sm mb-3">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  <span>{edu.period}</span>
                </div>

                {/* Description */}
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
