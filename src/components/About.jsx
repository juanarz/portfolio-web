import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faDatabase, faChartLine, faGraduationCap, faCalendar, faBrain } from '@fortawesome/free-solid-svg-icons'

const About = () => {
  const features = [
    {
      icon: faCode,
      title: 'Full-Stack Development',
      description: 'Building and scaling web applications with Spring Boot, React, and modern technologies',
    },
    {
      icon: faDatabase,
      title: 'Database Management',
      description: 'Optimizing and administering databases (MySQL, PostgreSQL, MariaDB) with SQL expertise',
    },
    {
      icon: faChartLine,
      title: 'Data Analysis',
      description: 'Transforming data into insights using SQL, Power BI, and Excel for data-driven decisions',
    },
    {
      icon: faBrain,
      title: 'AI & Machine Learning',
      description: 'Developing predictive models and deep learning solutions with Python and TensorFlow',
    },
  ]

  const education = [
    {
      degree: 'Systems Engineer',
      institution: 'Universidad Industrial de Santander (UIS)',
      field: 'Computer Science and Information Systems',
      period: '2020 - 2025',
      description: 'Developed strong skills in software development, databases, and data analysis. Participated in projects involving web systems, artificial intelligence, and information security.',
      logo: '/uis-logo.png'
    },
    {
      degree: 'Technical High School in Systems',
      institution: 'Colegio San José de Guanentá',
      field: 'Information Technology and Systems',
      period: '2014 - 2019',
      description: 'Completed technical high school focused on computer systems, programming, and network management.',
      logo: '/guanenta-logo.png'
    }
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-4">
            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
              Hi! I'm Juan Pablo, a Systems Engineer based in Bucaramanga, Colombia.
              I specialize in building full-stack web applications and using data to create intelligent, efficient solutions.

            </p>
            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
              My journey began by building my first website, which quickly evolved into a passion for both the art of development 
              and the science of data. Today, I leverage technologies like Spring Boot, React, and Python to bring ideas to life.</p>
            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
              My main focus is developing robust digital experiences and data-driven tools from predictive AI models to streamlined 
              management systems that solve real-world problems effectively.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
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
              Education
            </h3>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
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
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{edu.degree}</h4>
                    <p className="text-blue-400 font-medium">{edu.institution}</p>
                  </div>
                </div>

                {/* Field */}
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-2 italic">{edu.field}</p>

                {/* Period */}
                <div className="flex items-center text-slate-500 dark:text-gray-400 text-sm mb-3">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  <span>{edu.period}</span>
                </div>

                {/* Description */}
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
