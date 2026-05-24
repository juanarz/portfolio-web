import {
  faJs,
  faPython,
  faJava,
  faGitAlt,
  faUbuntu,
} from '@fortawesome/free-brands-svg-icons'
import {
  faDatabase,
  faChartBar,
  faFileExcel,
  faCloud,
} from '@fortawesome/free-solid-svg-icons'

export const skillsContent = {
  en: {
    title: 'My',
    highlight: 'Skills',
    categories: [
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
          {
            name: 'SQL (MySQL, PostgreSQL, MariaDB)',
            icon: faDatabase,
            color: 'text-blue-400',
          },
          { name: 'Excel', icon: faFileExcel, color: 'text-green-600' },
          { name: 'Power BI', icon: faChartBar, color: 'text-yellow-500' },
        ],
      },
      {
        title: 'Tools & Infrastructure',
        skills: [
          { name: 'Git', icon: faGitAlt, color: 'text-orange-500' },
          {
            name: 'Web Server (Ubuntu, Apache)',
            icon: faUbuntu,
            color: 'text-orange-600',
          },
          { name: 'Microsoft Azure', icon: faCloud, color: 'text-blue-400' },
        ],
      },
    ],
  },
  es: {
    title: 'Mis',
    highlight: 'Habilidades',
    categories: [
      {
        title: 'Lenguajes de Programación',
        skills: [
          { name: 'Java (Spring Boot)', icon: faJava, color: 'text-orange-500' },
          { name: 'Python', icon: faPython, color: 'text-blue-500' },
          { name: 'JavaScript (React)', icon: faJs, color: 'text-yellow-400' },
        ],
      },
      {
        title: 'Bases de Datos y Datos',
        skills: [
          {
            name: 'SQL (MySQL, PostgreSQL, MariaDB)',
            icon: faDatabase,
            color: 'text-blue-400',
          },
          { name: 'Excel', icon: faFileExcel, color: 'text-green-600' },
          { name: 'Power BI', icon: faChartBar, color: 'text-yellow-500' },
        ],
      },
      {
        title: 'Herramientas e Infraestructura',
        skills: [
          { name: 'Git', icon: faGitAlt, color: 'text-orange-500' },
          {
            name: 'Servidor Web (Ubuntu, Apache)',
            icon: faUbuntu,
            color: 'text-orange-600',
          },
          { name: 'Microsoft Azure', icon: faCloud, color: 'text-blue-400' },
        ],
      },
    ],
  },
}
