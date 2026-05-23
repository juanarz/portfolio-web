import {
  faCode,
  faDatabase,
  faChartLine,
  faBrain,
} from '@fortawesome/free-solid-svg-icons'

export const aboutContent = {
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
}
