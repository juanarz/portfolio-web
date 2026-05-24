import {
  faCode,
  faDatabase,
  faChartLine,
  faBrain,
} from '@fortawesome/free-solid-svg-icons'

export const aboutContent = {
  en: {
    sectionTitle: 'About',
    sectionHighlight: 'Me',
    educationTitle: 'Education',
    paragraphs: [
      "Hi! I'm Juan Pablo, a Systems Engineer based in Bucaramanga, Colombia. I specialize in building full-stack web applications and using data to create intelligent, efficient solutions.",
      'My journey began by building my first website, which quickly evolved into a passion for both the art of development and the science of data. Today, I leverage technologies like Spring Boot, React, and Python to bring ideas to life.',
      'My main focus is developing robust digital experiences and data-driven tools from predictive AI models to streamlined management systems that solve real-world problems effectively.',
    ],
    features: [
      {
        icon: faCode,
        title: 'Full-Stack Development',
        description:
          'Building and scaling web applications with Spring Boot, React, and modern technologies',
      },
      {
        icon: faDatabase,
        title: 'Database Management',
        description:
          'Optimizing and administering databases (MySQL, PostgreSQL, MariaDB) with SQL expertise',
      },
      {
        icon: faChartLine,
        title: 'Data Analysis',
        description:
          'Transforming data into insights using SQL, Power BI, and Excel for data-driven decisions',
      },
      {
        icon: faBrain,
        title: 'AI & Machine Learning',
        description:
          'Developing predictive models and deep learning solutions with Python and TensorFlow',
      },
    ],
    education: [
      {
        degree: 'Systems Engineer',
        institution: 'Universidad Industrial de Santander (UIS)',
        field: 'Computer Science and Information Systems',
        period: '2020 - 2025',
        description:
          'Developed strong skills in software development, databases, and data analysis. Participated in projects involving web systems, artificial intelligence, and information security.',
        logo: '/uis-logo.png',
      },
      {
        degree: 'Technical High School in Systems',
        institution: 'Colegio San José de Guanentá',
        field: 'Information Technology and Systems',
        period: '2014 - 2019',
        description:
          'Completed technical high school focused on computer systems, programming, and network management.',
        logo: '/guanenta-logo.png',
      },
    ],
  },
  es: {
    sectionTitle: 'Sobre',
    sectionHighlight: 'mí',
    educationTitle: 'Educación',
    paragraphs: [
      '¡Hola! Soy Juan Pablo, Ingeniero de Sistemas en Bucaramanga, Colombia. Me especializo en construir aplicaciones web full-stack y en usar datos para crear soluciones inteligentes y eficientes.',
      'Mi camino comenzó construyendo mi primer sitio web y se convirtió rápidamente en una pasión por el arte del desarrollo y la ciencia de los datos. Hoy uso tecnologías como Spring Boot, React y Python para dar vida a las ideas.',
      'Mi enfoque principal es desarrollar experiencias digitales sólidas y herramientas basadas en datos, desde modelos predictivos de IA hasta sistemas de gestión que resuelven problemas reales.',
    ],
    features: [
      {
        icon: faCode,
        title: 'Desarrollo Full-Stack',
        description:
          'Construcción y escalamiento de aplicaciones web con Spring Boot, React y tecnologías modernas',
      },
      {
        icon: faDatabase,
        title: 'Gestión de bases de datos',
        description:
          'Optimización y administración de bases de datos (MySQL, PostgreSQL, MariaDB) con experiencia en SQL',
      },
      {
        icon: faChartLine,
        title: 'Análisis de datos',
        description:
          'Transformación de datos en insights usando SQL, Power BI y Excel para decisiones basadas en datos',
      },
      {
        icon: faBrain,
        title: 'IA y Machine Learning',
        description:
          'Desarrollo de modelos predictivos y soluciones de deep learning con Python y TensorFlow',
      },
    ],
    education: [
      {
        degree: 'Ingeniero de Sistemas',
        institution: 'Universidad Industrial de Santander (UIS)',
        field: 'Ciencias de la Computación y Sistemas de Información',
        period: '2020 - 2025',
        description:
          'Desarrollé habilidades sólidas en desarrollo de software, bases de datos y análisis de datos. Participé en proyectos de sistemas web, inteligencia artificial y seguridad de la información.',
        logo: '/uis-logo.png',
      },
      {
        degree: 'Bachiller Técnico en Sistemas',
        institution: 'Colegio San José de Guanentá',
        field: 'Tecnología de la Información y Sistemas',
        period: '2014 - 2019',
        description:
          'Finalicé el bachillerato técnico con enfoque en sistemas informáticos, programación y gestión de redes.',
        logo: '/guanenta-logo.png',
      },
    ],
  },
}
