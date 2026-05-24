import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { skillsContent } from '../../data/skills'
import { useLanguage } from '../../context/LanguageContext'

const Skills = () => {
  const { language } = useLanguage()
  const content = skillsContent[language]

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {content.title} <span className="text-gradient">{content.highlight}</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {content.categories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-transparent dark:border-dark-border"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all duration-300 group"
                  >
                    <FontAwesomeIcon
                      icon={skill.icon}
                      className={`h-8 w-8 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div className="w-full">
                      <span className="text-lg font-medium">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
