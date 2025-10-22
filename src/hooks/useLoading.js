import { useState, useEffect } from 'react'

export const useLoading = (initialLoading = true, delay = 2000) => {
  const [isLoading, setIsLoading] = useState(initialLoading)

  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [initialLoading, delay])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return {
    isLoading,
    startLoading,
    stopLoading
  }
}

export default useLoading
