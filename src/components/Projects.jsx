import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faChrome } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const Projects = () => {
  const projects = [
    {
      title: 'BiblioPlus - Library Loan Manager',
      description:
        'Full-stack web application for library management with REST API integration and comprehensive data management. Enables efficient book lending, user management, and inventory tracking.',
      technologies: ['Spring Boot', 'React', 'MySQL', 'REST API'],
      github: 'https://github.com/juanarz/Tienda_BiBlioPlus_react',
      live: null,
      image: '/BiblioPlus.jpeg',
      period: 'May 2024 - Nov 2024'
    },
    {
      title: 'UILS - Shared Mobility Platform',
      description:
        'Web application for coordinating carpooling trips with cloud-based backend infrastructure. Connects students and staff for efficient shared transportation.',
      technologies: ['Ionic', 'Spring Boot', 'Azure SQL', 'Cloud'],
      github: 'https://github.com/juanarz/uils',
      live: null,
      image: '/uils.png',
      period: 'Jan 2024 - Apr 2024'
    },
    {
      title: 'Airline - Flight Prediction Model',
      description:
        'AI model for flight classification (On Time, Delayed, Cancelled) using historical and real-time data. Implements machine learning algorithms for accurate predictions.',
      technologies: ['Python', 'scikit-learn', 'pandas', 'Machine Learning'],
      github: 'https://github.com/juanarz/Airline ',
      live: null,
      image: '/Airline-project.jpeg',
      period: 'Mar 2023 - Jul 2023'
    },
    {
      title: 'AI-Based Cataract Classification',
      description:
        'Deep learning model to classify cataracts in ocular images using CNN and DNN architectures. Supports medical professionals by automating early diagnosis and recommending treatments.',
      technologies: ['Python', 'TensorFlow', 'CNN', 'DNN', 'Deep Learning'],
      github: 'https://github.com/juanarz/Clasificaci-n-Cataratas',
      live: null,
      image: '/clasificacion-cataratas.png',
      period: 'Aug 2024 - Nov 2024'
    },
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-effect rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                </div>
                
                {/* Period */}
                {project.period && (
                  <p className="text-sm text-blue-400 mb-3">{project.period}</p>
                )}
                
                <p className="text-slate-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    <span>GitHub</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
