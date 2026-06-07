import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const TypewriterCarousel = ({
  roles,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]

    if (isPaused) {
      const pauseTimeout = window.setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)

      return () => window.clearTimeout(pauseTimeout)
    }

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        const typingTimeout = window.setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, typingSpeed)

        return () => window.clearTimeout(typingTimeout)
      }

      setIsPaused(true)
      return undefined
    }

    if (displayText.length > 0) {
      const deletingTimeout = window.setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, deletingSpeed)

      return () => window.clearTimeout(deletingTimeout)
    }

    setIsDeleting(false)
    setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    return undefined
  }, [currentRoleIndex, deletingSpeed, displayText, isDeleting, isPaused, pauseDuration, roles, typingSpeed])

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        textAlign: 'left',
      }}
    >
      {displayText}
      <span aria-hidden="true">|</span>
    </span>
  )
}

TypewriterCarousel.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  typingSpeed: PropTypes.number,
  deletingSpeed: PropTypes.number,
  pauseDuration: PropTypes.number,
  className: PropTypes.string,
}

export default TypewriterCarousel
