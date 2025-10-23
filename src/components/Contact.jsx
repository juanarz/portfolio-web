import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import ContactForm from './ContactForm'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
    alert('Message sent! (This is a demo)')
  }

  const contactInfo = [
    {
      icon: faEnvelope,
      title: 'Email',
      value: 'juanpablo00444@gmail.com',
      link: 'mailto:juanpablo00444@gmail.com',
    },

    {
      icon: faMapMarkerAlt,
      title: 'Location',
      value: 'Bucaramanga, Colmbia',
      link: null,
    },
  ]

  const socialLinks = [
    { icon: faGithub, link: 'https://github.com/juanarz', label: 'GitHub' },
    { icon: faLinkedin, link: 'https://linkedin.com/in/juan-pablo-arias-549086248/', label: 'LinkedIn' },
    { icon: faInstagram, link: 'https://Instagram.com/juan_aarias', label: 'Instagram' }
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-slate-100/50 dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-gray-400 text-lg">
            Have a project in mind? Let's work together!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon
                        icon={info.icon}
                        className="h-5 w-5 text-blue-400"
                      />
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-gray-400 text-sm">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-slate-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-800 dark:text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-200/50 dark:bg-white/5 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      className="h-5 w-5 text-gray-400 hover:text-blue-400"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect p-8 rounded-lg">
              <ContactForm />

           
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
