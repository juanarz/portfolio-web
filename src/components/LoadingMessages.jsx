import { useState, useEffect } from 'react'

const LoadingMessages = () => {
  const [currentMessage, setCurrentMessage] = useState(0)
  
  const messages = [
    "Cargando portafolio...",
    "Preparando proyectos...",
    "Organizando habilidades...",
    "Finalizando detalles...",
    "¡Casi listo!"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 400) // Cambia cada 400ms

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="text-center mb-8">
      <p className="text-slate-600 dark:text-gray-400 text-lg font-medium animate-pulse">
        {messages[currentMessage]}
      </p>
    </div>
  )
}

export default LoadingMessages
