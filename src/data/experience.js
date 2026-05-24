import { FaDatabase, FaUserGraduate } from 'react-icons/fa'

export const experienceContent = {
  en: {
    title: 'Work',
    highlight: 'Experience',
    items: [
      {
        id: 1,
        role: 'Web Development Assistant',
        company: 'IPRED, UIS',
        period: 'Feb 2024 - Jul 2025',
        icon: FaDatabase,
        achievements: [
          'Optimized the Thesis Management System by analyzing and validating data with SQL.',
          'Improved database performance through enhanced MySQL/MariaDB modeling.',
          'Conducted functional testing and generated reports to ensure data reliability.',
        ],
      },
      {
        id: 2,
        role: 'Information Systems Tutor',
        company: 'Universidad Industrial de Santander',
        period: 'Jan 2023 - Sep 2023',
        icon: FaUserGraduate,
        achievements: [
          'Tutored students in database concepts and information analysis.',
          'Fostered critical thinking and autonomous learning skills.',
        ],
      },
      {
        id: 3,
        role: 'Development Engineer',
        company: 'Macpollo, AVSA SA',
        period: 'Dec 2025 - Currently',
        icon: FaDatabase,
        achievements: [
          'Full stack development with Spring Boot and Angular.',
          'REST API implementation using MVC and Hexagonal Architecture.',
          'AWS S3 and SAP backend integration.',
          'SQL Server and PostgreSQL management.',
          'Deployment with Docker Compose and Bitvise.',
        ],
      },
    ],
  },
  es: {
    title: 'Experiencia',
    highlight: 'Laboral',
    items: [
      {
        id: 1,
        role: 'Asistente de Desarrollo Web',
        company: 'IPRED, UIS',
        period: 'Feb 2024 - Jul 2025',
        icon: FaDatabase,
        achievements: [
          'Optimicé el Sistema de Gestión de Tesis analizando y validando datos con SQL.',
          'Mejoré el rendimiento de la base de datos con modelado avanzado en MySQL/MariaDB.',
          'Realicé pruebas funcionales y generé reportes para asegurar la confiabilidad de los datos.',
        ],
      },
      {
        id: 2,
        role: 'Tutor de Sistemas de Información',
        company: 'Universidad Industrial de Santander',
        period: 'Jan 2023 - Sep 2023',
        icon: FaUserGraduate,
        achievements: [
          'Acompañé estudiantes en conceptos de bases de datos y análisis de información.',
          'Fomenté el pensamiento crítico y el aprendizaje autónomo.',
        ],
      },
      {
        id: 3,
        role: 'Ingeniero de Desarrollo',
        company: 'Macpollo, AVSA SA',
        period: 'Dec 2025 - Actualmente',
        icon: FaDatabase,
        achievements: [
          'Desarrollo full stack con Spring Boot y Angular.',
          'Implementación de API REST usando MVC y Arquitectura Hexagonal.',
          'Integración con AWS S3 y backend SAP.',
          'Gestión de SQL Server y PostgreSQL.',
          'Despliegues con Docker Compose y Bitvise.',
        ],
      },
    ],
  },
}
