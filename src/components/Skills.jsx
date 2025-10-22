import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faReact,
  faJs,
  faPython,
  faJava,
  faGitAlt,
  faUbuntu,
} from '@fortawesome/free-brands-svg-icons'
import { faDatabase, faServer, faChartBar, faFileExcel, faCloud } from '@fortawesome/free-solid-svg-icons'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Java (Spring Boot)', icon: faJava, color: 'text-orange-500' },
        { name: 'Python', icon: faPython, color: 'text-blue-500' },
        { name: 'JavaScript (React)', icon: faJs, color: 'text-yellow-400' },
      ],
    },
    {
      title: 'Databases & Data',
      skills: [
        { name: 'SQL (MySQL, PostgreSQL, MariaDB)', icon: faDatabase, color: 'text-blue-400' },
        { name: 'Excel', icon: faFileExcel, color: 'text-green-600' },
        { name: 'Power BI', icon: faChartBar, color: 'text-yellow-500' },
      ],
    },
    {
      title: 'Tools & Infrastructure',
      skills: [
        { name: 'Git', icon: faGitAlt, color: 'text-orange-500' },
        { name: 'Web Server (Ubuntu, Apache)', icon: faUbuntu, color: 'text-orange-600' },
        { name: 'Microsoft Azure', icon: faCloud, color: 'text-blue-400' },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-slate-100/50 dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="glass-effect p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                {category.title}
              </h3>
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
                    <span className="text-lg font-medium">{skill.name}</span>
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
