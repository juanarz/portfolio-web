import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const heroContent = {
  en: {
    greeting: 'Hi, my name is',
    name: 'Juan Pablo',
    title: 'I build things for the web with data',
    description:
      "I'm a Systems Engineer specializing in full-stack development with Spring Boot & React and data-driven problem solving using SQL & Python. I build scalable web applications and transform data into actionable insights.",
    profileImage: '/profile.png',
    ctas: [
      {
        label: 'View My Work',
        href: '#projects',
        variant: 'primary',
      },
      {
        label: 'Get In Touch',
        href: '#contact',
        variant: 'secondary',
      },
    ],
    socialLinks: [
      {
        label: 'GitHub',
        href: 'https://github.com/juanarz',
        icon: faGithub,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/juan-pablo-arias-549086248/',
        icon: faLinkedin,
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/juan_aarias/',
        icon: faInstagram,
      },
      {
        label: 'Email',
        href: 'mailto:juanpablo00444@gmail.com',
        icon: faEnvelope,
      },
    ],
    scrollTarget: '#about',
  },
  es: {
    greeting: 'Hola, mi nombre es',
    name: 'Juan Pablo',
    title: 'Construyo cosas para la web con datos',
    description:
      'Soy Ingeniero de Sistemas especializado en desarrollo full-stack con Spring Boot y React, y en la resolución de problemas con datos usando SQL y Python. Construyo aplicaciones web escalables y transformo datos en insights accionables.',
    profileImage: '/profile.png',
    ctas: [
      {
        label: 'Ver mi trabajo',
        href: '#projects',
        variant: 'primary',
      },
      {
        label: 'Hablemos',
        href: '#contact',
        variant: 'secondary',
      },
    ],
    socialLinks: [
      {
        label: 'GitHub',
        href: 'https://github.com/juanarz',
        icon: faGithub,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/juan-pablo-arias-549086248/',
        icon: faLinkedin,
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/juan_aarias/',
        icon: faInstagram,
      },
      {
        label: 'Correo',
        href: 'mailto:juanpablo00444@gmail.com',
        icon: faEnvelope,
      },
    ],
    scrollTarget: '#about',
  },
}
