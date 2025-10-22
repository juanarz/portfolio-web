import { useState, useEffect } from 'react'

const ProgressBar = ({ duration = 2000, onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          onComplete?.()
          return 100
        }
        return prevProgress + 1
      })
    }, duration / 100)

    return () => clearInterval(interval)
  }, [duration, onComplete])

  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar
