import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

export const contactContent = {
  en: {
    heading: 'Get In',
    highlight: 'Touch',
    subheading: "Have a project in mind? Let's work together!",
    infoTitle: 'Contact Information',
    followTitle: 'Follow Me',
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
        value: 'Bucaramanga, Colombia',
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
  },
  es: {
    heading: 'Ponte en',
    highlight: 'Contacto',
    subheading: '¿Tienes un proyecto en mente? ¡Trabajemos juntos!',
    infoTitle: 'Información de contacto',
    followTitle: 'Sígueme',
    contactInfo: [
      {
        icon: faEnvelope,
        title: 'Correo',
        value: 'juanpablo00444@gmail.com',
        link: 'mailto:juanpablo00444@gmail.com',
      },
      {
        icon: faMapMarkerAlt,
        title: 'Ubicación',
        value: 'Bucaramanga, Colombia',
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
  },
}
