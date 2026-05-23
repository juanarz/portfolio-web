import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

export const contactContent = {
  heading: 'Get In Touch',
  subheading: "Have a project in mind? Let's work together!",
  contactInfo: [
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
  ],
  socialLinks: [
    { icon: faGithub, link: 'https://github.com/juanarz', label: 'GitHub' },
    {
      icon: faLinkedin,
      link: 'https://linkedin.com/in/juan-pablo-arias-549086248/',
      label: 'LinkedIn',
    },
    {
      icon: faInstagram,
      link: 'https://Instagram.com/juan_aarias',
      label: 'Instagram',
    },
  ],
}
