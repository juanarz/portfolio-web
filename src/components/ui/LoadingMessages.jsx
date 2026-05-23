import { useState, useEffect } from 'react'
import { loadingMessages } from '../../data/loadingMessages'

const LoadingMessages = () => {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, 400) // Cambia cada 400ms

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center mb-8">
      <p className="text-slate-600 dark:text-gray-400 text-lg font-medium animate-pulse">
        {loadingMessages[currentMessage]}
      </p>
    </div>
  )
}

export default LoadingMessages
