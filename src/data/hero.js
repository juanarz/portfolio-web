import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const heroContent = {
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
}
