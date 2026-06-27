import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { socialMock } from '../../data/socialMock'
import { useLanguage } from '../../context/LanguageContext'

const labels = {
  en: {
    title: 'Social',
    highlight: 'Media',
    eyebrow: 'Instagram Insights',
    subtitle: 'Live Meta stats from my Instagram professional account.',
    followers: 'Followers',
    posts: 'Posts',
    profileViews: 'Profile views',
    reach: 'Reach',
    chartTitle: 'Daily reach',
    chartSubtitle: 'Latest values available from Meta Graph API',
    live: 'Live',
    syncing: 'Syncing',
    unavailable: 'Cached',
    profileAlt: 'Instagram profile',
    openProfile: 'Open Instagram profile',
    bio: 'Instagram professional account connected through Meta Graph API.',
  },
  es: {
    title: 'Redes',
    highlight: 'Sociales',
    eyebrow: 'Instagram Insights',
    subtitle: 'Estadísticas reales de Meta desde mi cuenta profesional de Instagram.',
    followers: 'Seguidores',
    posts: 'Publicaciones',
    profileViews: 'Visitas al perfil',
    reach: 'Alcance',
    chartTitle: 'Alcance diario',
    chartSubtitle: 'Últimos valores disponibles desde Meta Graph API',
    live: 'En vivo',
    syncing: 'Sincronizando',
    unavailable: 'Cache',
    profileAlt: 'Perfil de Instagram',
    openProfile: 'Abrir perfil de Instagram',
    bio: 'Cuenta profesional de Instagram conectada mediante Meta Graph API.',
  },
}

const formatNumber = (value) => new Intl.NumberFormat('en').format(value || 0)

const formatCompactNumber = (value) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value || 0)

const formatChartDate = (value) => {
  if (!value) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

const getFallbackInstagram = (data) => ({
  profile: {
    username: data.summary.instagram.handle.replace('@', ''),
    name: 'Juan Pablo',
    followers: data.summary.instagram.followers,
    mediaCount: data.summary.instagram.posts,
    profilePictureUrl: '',
  },
  insights: {
    profileViews: data.summary.instagram.profileViews || 247,
    latestReach: data.summary.instagram.reach || data.trends.instagram.at(-1) || 0,
    reach: data.trends.instagram.map((value, index) => ({
      value,
      endTime: new Date(Date.now() - (data.trends.instagram.length - index - 1) * 86400000).toISOString(),
    })),
  },
})

const buildInstagramData = (baseData, instagramStats) => {
  if (instagramStats?.profile && instagramStats?.insights) {
    return instagramStats
  }

  return getFallbackInstagram(baseData)
}

const ReachChart = ({ points }) => {
  if (!points?.length) return null

  const width = 720
  const height = 240
  const padding = 28
  const values = points.map((point) => point.value)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1

  const coordinates = points.map((point, index) => {
    const x = points.length === 1
      ? width - padding
      : padding + (index / (points.length - 1)) * (width - padding * 2)
    const y = height - padding - ((point.value - min) / range) * (height - padding * 2)

    return { ...point, x, y }
  })

  const linePath = coordinates
    .map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ')

  const areaPath = `${linePath} L ${coordinates.at(-1).x.toFixed(2)} ${height - padding} L ${coordinates[0].x.toFixed(2)} ${height - padding} Z`

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200/70 bg-white/40 p-3 dark:border-white/10 dark:bg-white/[0.03]">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full" role="img" aria-label="Instagram reach chart">
        <defs>
          <linearGradient id="reach-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="reach-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2].map((line) => {
          const y = padding + line * ((height - padding * 2) / 2)
          return (
            <line
              key={line}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke="currentColor"
              className="text-slate-300 dark:text-white/10"
              strokeWidth="1"
            />
          )
        })}

        <path d={areaPath} fill="url(#reach-area)" />
        <path d={linePath} fill="none" stroke="url(#reach-line)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

        {coordinates.map((point) => (
          <g key={`${point.endTime}-${point.value}`}>
            <circle cx={point.x} cy={point.y} r="6" fill="#0F172A" className="dark:fill-slate-950" />
            <circle cx={point.x} cy={point.y} r="4" fill="#60A5FA" />
          </g>
        ))}
      </svg>

      <div className="grid grid-cols-2 gap-3 px-1 pb-1 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-4">
        {points.map((point) => (
          <div key={`${point.endTime}-${point.value}`} className="flex items-center justify-between gap-2 rounded-md bg-slate-100/70 px-2 py-1 dark:bg-white/5">
            <span>{formatChartDate(point.endTime)}</span>
            <span className="font-semibold text-slate-700 dark:text-white">{formatCompactNumber(point.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MetricCard = ({ label, value, accent = 'blue' }) => {
  const accentClass = accent === 'purple' ? 'from-purple-500/20 to-fuchsia-500/10 text-purple-300' : 'from-blue-500/20 to-cyan-500/10 text-blue-300'

  return (
    <div className="glass-effect rounded-lg p-5">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${accentClass}`}>
        <span className="h-2 w-2 rounded-full bg-current" />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  )
}

const SocialStats = ({ data = socialMock }) => {
  const { language } = useLanguage()
  const content = labels[language]
  const [instagramStats, setInstagramStats] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    const loadInstagramStats = async () => {
      try {
        const response = await fetch('/api/instagram-stats')

        if (!response.ok) {
          throw new Error('Instagram stats endpoint is not available')
        }

        const payload = await response.json()

        if (!payload.configured || payload.error) {
          throw new Error(payload.error || 'Instagram stats are not configured')
        }

        if (isMounted) {
          setInstagramStats(payload)
          setStatus('live')
        }
      } catch {
        if (isMounted) {
          setStatus('unavailable')
        }
      }
    }

    loadInstagramStats()

    return () => {
      isMounted = false
    }
  }, [])

  const instagram = useMemo(() => buildInstagramData(data, instagramStats), [data, instagramStats])
  const profile = instagram.profile
  const insights = instagram.insights
  const instagramUrl = `https://www.instagram.com/${profile.username}/`
  const statusLabel = status === 'live' ? content.live : status === 'loading' ? content.syncing : content.unavailable

  return (
    <section id="social-stats" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-500 dark:text-blue-400">{content.eyebrow}</p>
          <h2 className="mb-4 text-4xl font-bold">
            {content.title} <span className="text-gradient">{content.highlight}</span>
          </h2>
          <div className="mx-auto mb-4 h-1 w-20 bg-blue-500" />
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-400">{content.subtitle}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect group flex min-h-full flex-col justify-between rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-200/50 dark:hover:bg-white/10"
            aria-label={content.openProfile}
          >
            <div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    {profile.profilePictureUrl ? (
                      <img
                        src={profile.profilePictureUrl}
                        alt={content.profileAlt}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">
                        JP
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{profile.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400">@{profile.username}</p>
                  </div>
                </div>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500 dark:text-blue-300">
                  {statusLabel}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">{content.bio}</p>
            </div>

            <div className="mt-8 rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{content.followers}</p>
                  <p className="mt-1 text-4xl font-bold text-slate-900 dark:text-white">{formatCompactNumber(profile.followers)}</p>
                </div>
                <span className="text-sm font-medium text-blue-500 dark:text-blue-300">@{profile.username}</span>
              </div>
            </div>
          </a>

          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard label={content.followers} value={formatNumber(profile.followers)} />
              <MetricCard label={content.posts} value={formatNumber(profile.mediaCount)} accent="purple" />
              <MetricCard label={content.profileViews} value={formatNumber(insights.profileViews)} />
              <MetricCard label={content.reach} value={formatNumber(insights.latestReach)} accent="purple" />
            </div>

            <div className="glass-effect rounded-lg p-5 sm:p-6">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{content.chartTitle}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{content.chartSubtitle}</p>
                </div>
                <p className="text-3xl font-bold text-gradient">{formatCompactNumber(insights.latestReach)}</p>
              </div>

              <ReachChart points={insights.reach} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

ReachChart.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      endTime: PropTypes.string,
    })
  ),
}

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  accent: PropTypes.oneOf(['blue', 'purple']),
}

SocialStats.propTypes = {
  data: PropTypes.object,
}

export default SocialStats
