import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const AsciiMorphText = ({ text, className = '', onComplete }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const chars = '!<>-_\\/[]{}=+*^?#________'
    const letters = text.split('')
    const timeouts = []
    const intervals = []
    let completedLetters = 0

    if (!containerRef.current) return undefined

    containerRef.current.innerHTML = ''

    letters.forEach((letter) => {
      const span = document.createElement('span')
      span.textContent = letter
      span.style.opacity = '0'
      span.style.display = 'inline-block'
      span.style.minWidth = letter === ' ' ? '0.35em' : 'auto'
      containerRef.current.appendChild(span)
    })

    const spans = containerRef.current.querySelectorAll('span')

    spans.forEach((span, index) => {
      const letter = letters[index]
      let iterations = 0

      const timeout = window.setTimeout(() => {
        const interval = window.setInterval(() => {
          if (iterations < 10) {
            span.textContent = letter === ' ' ? '\u00A0' : chars[Math.floor(Math.random() * chars.length)]
            span.style.opacity = '1'
            span.style.color = 'currentColor'
          } else {
            span.textContent = letter === ' ' ? '\u00A0' : letter
            span.style.opacity = '1'
            span.style.color = 'currentColor'
            window.clearInterval(interval)
            completedLetters += 1

            if (completedLetters === letters.length) {
              onComplete?.()
            }
          }

          iterations += 1
        }, 50)

        intervals.push(interval)
      }, index * 100)

      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
      intervals.forEach((interval) => window.clearInterval(interval))
    }
  }, [onComplete, text])

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-block',
        fontFamily: 'inherit',
        letterSpacing: 'inherit',
      }}
    />
  )
}

AsciiMorphText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onComplete: PropTypes.func,
}

export default AsciiMorphText
