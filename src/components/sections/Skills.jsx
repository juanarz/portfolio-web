import { useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { skillsContent } from '../../data/skills'
import { useLanguage } from '../../context/LanguageContext'

const SEGMENTS = 35
const MIN_SCALE = 0.5
const MAX_SCALE = 1

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const wrapAngle = (degrees) => {
  const normalized = ((degrees + 180) % 360 + 360) % 360
  return normalized - 180
}

const buildDomeItems = (skills) => {
  const columns = Array.from({ length: SEGMENTS }, (_, index) => -37 + index * 2)
  const evenRows = [-4, -2, 0, 2, 4]
  const oddRows = [-3, -1, 1, 3, 5]
  const slots = columns.flatMap((x, columnIndex) => {
    const rows = columnIndex % 2 === 0 ? evenRows : oddRows
    return rows.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }))
  })

  return slots.map((slot, index) => ({
    ...slot,
    skill: skills[index % skills.length],
  }))
}

const Skills = () => {
  const { language } = useLanguage()
  const content = skillsContent[language]
  const sectionRef = useRef(null)
  const sphereRef = useRef(null)
  const galleryRef = useRef(null)
  const dragStartRef = useRef(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const startRotationRef = useRef({ x: 0, y: 0 })
  const [scale, setScale] = useState(MIN_SCALE)

  const flatSkills = useMemo(
    () => content.categories.flatMap((category) => category.skills),
    [content.categories]
  )
  const domeItems = useMemo(() => buildDomeItems(flatSkills), [flatSkills])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      let visibilityRatio = 0

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const sectionCenter = rect.top + rect.height / 2
        const windowCenter = windowHeight / 2
        const distanceFromCenter = Math.abs(sectionCenter - windowCenter)
        const maxDistance = windowHeight / 2 + rect.height / 2
        visibilityRatio = clamp(1 - distanceFromCenter / maxDistance, 0, 1)
        visibilityRatio = visibilityRatio * visibilityRatio * (3 - 2 * visibilityRatio)
      }

      setScale(MIN_SCALE + (MAX_SCALE - MIN_SCALE) * visibilityRatio)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const root = galleryRef.current
    if (!root) return undefined

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const minDimension = Math.max(1, Math.min(width, height))
      const radius = clamp(Math.round(minDimension * 0.72), 320, 620)
      root.style.setProperty('--radius', `${radius}px`)
    })

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const applyRotation = (x, y) => {
    if (!sphereRef.current) return
    sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${x}deg) rotateY(${y}deg)`
  }

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartRef.current = { x: event.clientX, y: event.clientY }
    startRotationRef.current = { ...rotationRef.current }
  }

  const handlePointerMove = (event) => {
    if (!dragStartRef.current) return

    const nextX = clamp(
      startRotationRef.current.x - (event.clientY - dragStartRef.current.y) / 18,
      -5,
      5
    )
    const nextY = wrapAngle(startRotationRef.current.y + (event.clientX - dragStartRef.current.x) / 18)
    rotationRef.current = { x: nextX, y: nextY }
    applyRotation(nextX, nextY)
  }

  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragStartRef.current = null
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden py-20"
    >
      <div className="absolute inset-x-0 top-0 h-72 pointer-events-none bg-gradient-to-b from-slate-50 via-slate-50/70 to-transparent dark:from-dark-bg dark:via-dark-bg/70" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.16),_transparent_42%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(96,165,250,0.12),_transparent_46%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            {content.title} <span className="text-gradient">{content.highlight}</span>
          </h2>
        </div>

        <div
          ref={galleryRef}
          className="skills-dome relative mx-auto h-[520px] w-full max-w-6xl sm:h-[600px]"
          style={{ transform: `scale(${scale})` }}
        >
          <div
            className="skills-dome__stage"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div ref={sphereRef} className="skills-dome__sphere">
              {domeItems.map(({ x, y, sizeX, sizeY, skill }, index) => (
                <div
                  key={`${skill.name}-${x}-${y}-${index}`}
                  className="skills-dome__item"
                  style={{
                    '--offset-x': x,
                    '--offset-y': y,
                    '--item-size-x': sizeX,
                    '--item-size-y': sizeY,
                  }}
                >
                  <div className="skills-dome__tile" title={skill.name}>
                    <FontAwesomeIcon icon={skill.icon} className={`h-10 w-10 ${skill.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_38%,_rgba(248,250,252,0.62)_72%,_rgba(248,250,252,0.95)_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_38%,_rgba(15,23,42,0.58)_72%,_rgba(15,23,42,0.95)_100%)]" />
        </div>

        <div className="relative z-20 -mt-8 grid gap-4 md:grid-cols-3">
          {content.categories.map((category) => (
            <div
              key={category.title}
              className="border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-dark-card/70"
            >
              <h3 className="mb-4 text-center text-xl font-semibold">{category.title}</h3>
              <div className="grid gap-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3 rounded-md bg-slate-100/70 p-3 dark:bg-white/5">
                    <FontAwesomeIcon
                      icon={skill.icon}
                      className={`h-6 w-6 flex-none ${skill.color}`}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-100">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
