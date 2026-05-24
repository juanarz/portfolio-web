import { motion } from 'framer-motion'
import { FaCalendar } from 'react-icons/fa'
import { experienceContent } from '../../data/experience'
import { useLanguage } from '../../context/LanguageContext'

const Experience = () => {
  const { language } = useLanguage()
  const content = experienceContent[language]
  const experiences = content.items

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            {content.title} <span className="text-gradient">{content.highlight}</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {experiences.map((exp, index) => {
            const Icon = exp.icon
            const isLastOdd = experiences.length % 2 !== 0 && index === experiences.length - 1

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-effect p-6 rounded-lg hover:bg-slate-200/50 dark:bg-dark-card dark:hover:bg-dark-card-hover transition-all duration-300 transform hover:scale-[1.02] border border-transparent dark:border-dark-border ${
                  isLastOdd ? 'md:col-span-2 md:max-w-3xl md:mx-auto' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-blue-400">{exp.company}</p>
                      <div className="flex items-center text-slate-400 text-sm mt-1 mb-2">
                        <FaCalendar className="mr-2 text-gray-400" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gray-400 mr-2 mt-1.5">•</span>
                          <span className="text-slate-600 dark:text-slate-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
