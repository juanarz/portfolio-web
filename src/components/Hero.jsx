import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        {/* Profile Picture */}
        <div className="mb-8 animate-slide-up">
          <img
            src="/profile.png"
            alt="Juan Pablo"
            className="w-32 h-32 sm:w-56 sm:h-56 rounded-full mx-auto  hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Greeting */}
        <p className="text-blue-500 dark:text-blue-400 text-lg mb-4 animate-slide-up">
          Hi, my name is
        </p>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 animate-slide-up text-slate-800 dark:text-white">
          Juan Pablo
        </h1>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-600 dark:text-gray-400 mb-6 animate-slide-up">
          I build things for the web with data
        </h2>

        {/* Description */}
        <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8 animate-slide-up">
          I'm a Systems Engineer specializing in full-stack development with Spring Boot & React and data-driven problem solving using SQL & Python.
           I build scalable web applications and transform data into actionable insights.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
          <a
            href="#projects"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 glass-effect hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12 animate-slide-up">
          <a
            href="https://github.com/juanarz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/juan-pablo-arias-549086248/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/juan_aarias/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
          </a>
          <a
            href="mailto:juanpablo00444@gmail.com"
            className="text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="inline-block text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white transition-all duration-300 animate-bounce"
        >
          <FontAwesomeIcon icon={faArrowDown} className="h-6 w-6" />
        </a>
      </div>
    </section>
  )
}

export default Hero
