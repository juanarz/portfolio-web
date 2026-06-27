import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { FaBolt, FaBullseye, FaCameraRetro, FaClock, FaComment, FaExternalLinkAlt, FaEye, FaHeart, FaMousePointer, FaPlay, FaRegBookmark, FaShareAlt, FaUsers } from 'react-icons/fa'
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
    chartSubtitle: 'Day-by-day comparison from Meta Graph API',
    peak: 'Peak',
    latest: 'Latest',
    change: 'Change',
    live: 'Live',
    syncing: 'Syncing',
    unavailable: 'Cached',
    profileAlt: 'Instagram profile',
    openProfile: 'Open Instagram profile',
    bio: 'Instagram professional account connected through Meta Graph API.',
    latestContent: 'Latest posts and reels',
    latestContentSubtitle: 'Thumbnails and metrics available per media item.',
    unavailableMedia: 'Media insights will appear when the live API is available.',
    likes: 'Likes',
    comments: 'Comments',
    saved: 'Saved',
    shares: 'Shares',
    plays: 'Plays',
    views: 'Views',
    topContent: 'Top posts and reels',
    profileActions: 'Profile actions',
    engagement: 'Engagement',
    audienceActivity: 'Audience activity',
    websiteClicks: 'Website clicks',
    profileLinksTaps: 'Profile link taps',
    accountsEngaged: 'Accounts engaged',
    totalInteractions: 'Total interactions',
    onlineFollowers: 'Online followers',
    audienceUnavailable: 'Audience activity is available when Meta returns enough follower data.',
    noLiveInsights: 'Connect a valid Meta token to unlock this panel.',
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
    chartSubtitle: 'Comparación día a día desde Meta Graph API',
    peak: 'Pico',
    latest: 'Último',
    change: 'Cambio',
    live: 'En vivo',
    syncing: 'Sincronizando',
    unavailable: 'Cache',
    profileAlt: 'Perfil de Instagram',
    openProfile: 'Abrir perfil de Instagram',
    bio: 'Cuenta profesional de Instagram conectada mediante Meta Graph API.',
    latestContent: 'Últimos posts y reels',
    latestContentSubtitle: 'Miniaturas y métricas disponibles por publicación.',
    unavailableMedia: 'Los insights por media aparecerán cuando el API en vivo esté disponible.',
    likes: 'Likes',
    comments: 'Comentarios',
    saved: 'Guardados',
    shares: 'Compartidos',
    plays: 'Reproducciones',
    views: 'Vistas',
    topContent: 'Posts y reels destacados',
    profileActions: 'Acciones del perfil',
    engagement: 'Interacciones',
    audienceActivity: 'Actividad de audiencia',
    websiteClicks: 'Clics al sitio web',
    profileLinksTaps: 'Toques al enlace del perfil',
    accountsEngaged: 'Cuentas que interactuaron',
    totalInteractions: 'Interacciones totales',
    onlineFollowers: 'Seguidores conectados',
    audienceUnavailable: 'La actividad de audiencia aparece cuando Meta devuelve suficientes datos de seguidores.',
    noLiveInsights: 'Conecta un token válido de Meta para activar este panel.',
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
  accountInsights: {
    profileActions: {
      profileViews: data.summary.instagram.profileViews || 247,
      websiteClicks: null,
      profileLinksTaps: null,
    },
    engagement: {
      accountsEngaged: null,
      totalInteractions: null,
      likes: null,
      comments: null,
      shares: null,
      saves: null,
    },
    audienceActivity: {
      onlineFollowers: [],
      followerDemographics: [],
    },
  },
})

const buildInstagramData = (baseData, instagramStats) => {
  if (instagramStats?.profile && instagramStats?.insights) return instagramStats
  return {
    ...getFallbackInstagram(baseData),
    media: [],
    topMedia: [],
  }
}

const MetricCard = ({ icon: Icon, label, value, accent = 'blue', description }) => {
  const accentStyles = {
    blue: 'from-blue-500/20 to-cyan-500/10 text-blue-500 dark:text-blue-300',
    purple: 'from-purple-500/20 to-fuchsia-500/10 text-purple-500 dark:text-purple-300',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-500 dark:text-emerald-300',
    rose: 'from-rose-500/20 to-pink-500/10 text-rose-500 dark:text-rose-300',
  }

  return (
    <div className="glass-effect rounded-lg p-5">
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${accentStyles[accent]}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      {description && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
  )
}

const ReachChart = ({ points, content }) => {
  if (!points?.length) return null

  const recentPoints = points.slice(-7)
  const values = recentPoints.map((point) => point.value)
  const max = Math.max(...values, 1)
  const latest = recentPoints.at(-1)?.value || 0
  const previous = recentPoints.at(-2)?.value || 0
  const change = previous ? ((latest - previous) / previous) * 100 : 0

  return (
    <div className="rounded-lg border border-slate-200/70 bg-white/40 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400">{content.peak}</p>
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{formatCompactNumber(max)}</p>
        </div>
        <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400">{content.latest}</p>
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{formatCompactNumber(latest)}</p>
        </div>
        <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400">{content.change}</p>
          <p className={`mt-1 text-lg font-bold ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recentPoints.map((point, index) => {
          const width = Math.max((point.value / max) * 100, 3)
          const isLatest = index === recentPoints.length - 1

          return (
            <div key={`${point.endTime}-${point.value}`} className="grid grid-cols-[4.25rem_1fr_4rem] items-center gap-3">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{formatChartDate(point.endTime)}</span>
              <div className="h-4 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    isLatest ? 'from-blue-500 to-purple-500' : 'from-blue-400/70 to-blue-500/70'
                  }`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <span className="text-right text-sm font-bold text-slate-900 dark:text-white">{formatCompactNumber(point.value)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MoreDataPanel = ({ content }) => (
  <div className="glass-effect rounded-lg p-5 sm:p-6">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{content.moreDataTitle}</h3>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {content.moreData.map(([label, description]) => (
        <div key={label} className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
          <p className="text-sm font-semibold text-slate-800 dark:text-white">{label}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      ))}
    </div>
  </div>
)

const getMediaTitle = (media) => {
  const cleanCaption = media.caption?.replace(/\s+/g, ' ').trim()
  if (!cleanCaption) return media.mediaProductType || media.mediaType || 'Instagram media'
  return cleanCaption.length > 72 ? `${cleanCaption.slice(0, 72)}...` : cleanCaption
}

const MediaMetric = ({ icon: Icon, label, value }) => {
  if (typeof value !== 'number') return null

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100/80 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300" title={label}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {formatCompactNumber(value)}
    </span>
  )
}

const MediaCard = ({ item, content }) => (
  <a
    href={item.permalink}
    target="_blank"
    rel="noopener noreferrer"
    className="group overflow-hidden rounded-lg border border-slate-200/70 bg-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-800">
      {item.thumbnailUrl ? (
        <img
          src={item.thumbnailUrl}
          alt={getMediaTitle(item)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-500 dark:text-slate-400">
          <FaCameraRetro className="h-8 w-8" />
        </div>
      )}
      <div className="absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
        {item.mediaProductType || item.mediaType}
      </div>
    </div>

    <div className="p-4">
      <p className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-slate-900 dark:text-white">{getMediaTitle(item)}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <MediaMetric icon={FaHeart} label={content.likes} value={item.likeCount} />
        <MediaMetric icon={FaComment} label={content.comments} value={item.commentsCount} />
        <MediaMetric icon={FaBullseye} label={content.reach} value={item.insights?.reach} />
        <MediaMetric icon={FaRegBookmark} label={content.saved} value={item.insights?.saved} />
        <MediaMetric icon={FaShareAlt} label={content.shares} value={item.insights?.shares} />
        <MediaMetric icon={FaPlay} label={content.plays} value={item.insights?.plays ?? item.insights?.views} />
      </div>
    </div>
  </a>
)

const MediaGrid = ({ media = [], content }) => (
  <div className="glass-effect rounded-lg p-5 sm:p-6">
    <div className="mb-5 flex flex-col gap-1">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{content.latestContent}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{content.latestContentSubtitle}</p>
    </div>

    {media.length ? (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <MediaCard key={item.id} item={item} content={content} />
        ))}
      </div>
    ) : (
      <div className="rounded-lg bg-slate-100/70 p-5 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-400">
        {content.unavailableMedia}
      </div>
    )}
  </div>
)

const DataPoint = ({ icon: Icon, label, value }) => {
  const hasValue = typeof value === 'number'

  return (
    <div className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-300">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{hasValue ? formatNumber(value) : '--'}</p>
    </div>
  )
}

const DataPanel = ({ title, children }) => (
  <div className="glass-effect rounded-lg p-5 sm:p-6">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
    <div className="mt-4">{children}</div>
  </div>
)

const ProfileActionsPanel = ({ actions = {}, content }) => (
  <DataPanel title={content.profileActions}>
    <div className="grid gap-3 sm:grid-cols-3">
      <DataPoint icon={FaEye} label={content.profileViews} value={actions.profileViews} />
      <DataPoint icon={FaExternalLinkAlt} label={content.websiteClicks} value={actions.websiteClicks} />
      <DataPoint icon={FaMousePointer} label={content.profileLinksTaps} value={actions.profileLinksTaps} />
    </div>
  </DataPanel>
)

const EngagementPanel = ({ engagement = {}, content }) => (
  <DataPanel title={content.engagement}>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <DataPoint icon={FaUsers} label={content.accountsEngaged} value={engagement.accountsEngaged} />
      <DataPoint icon={FaBolt} label={content.totalInteractions} value={engagement.totalInteractions} />
      <DataPoint icon={FaHeart} label={content.likes} value={engagement.likes} />
      <DataPoint icon={FaComment} label={content.comments} value={engagement.comments} />
      <DataPoint icon={FaShareAlt} label={content.shares} value={engagement.shares} />
      <DataPoint icon={FaRegBookmark} label={content.saved} value={engagement.saves} />
    </div>
  </DataPanel>
)

const AudienceActivityPanel = ({ audience = {}, content }) => {
  const onlineFollowers = audience.onlineFollowers || []
  const hourlyEntries = onlineFollowers
    .flatMap((item) => {
      if (!item.value || typeof item.value !== 'object') return []
      return Object.entries(item.value).map(([hour, value]) => ({ hour, value }))
    })
    .sort((a, b) => Number(a.hour) - Number(b.hour))
    .slice(0, 8)
  const max = Math.max(...hourlyEntries.map((item) => item.value), 1)

  return (
    <DataPanel title={content.audienceActivity}>
      {hourlyEntries.length ? (
        <div className="space-y-3">
          {hourlyEntries.map((item) => (
            <div key={item.hour} className="grid grid-cols-[3.5rem_1fr_4rem] items-center gap-3">
              <span className="text-sm text-slate-500 dark:text-slate-400">{item.hour}h</span>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${Math.max((item.value / max) * 100, 3)}%` }} />
              </div>
              <span className="text-right text-sm font-bold text-slate-900 dark:text-white">{formatCompactNumber(item.value)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-slate-100/70 p-5 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-400">
          <FaClock className="mb-3 h-5 w-5 text-purple-500" />
          {content.audienceUnavailable}
        </div>
      )}
    </DataPanel>
  )
}

const InsightsPanels = ({ instagram, content }) => {
  const accountInsights = instagram.accountInsights || {}

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <ProfileActionsPanel actions={accountInsights.profileActions} content={content} />
      <EngagementPanel engagement={accountInsights.engagement} content={content} />
      <AudienceActivityPanel audience={accountInsights.audienceActivity} content={content} />
      <DataPanel title={content.topContent}>
        {instagram.topMedia?.length ? (
          <div className="space-y-3">
            {instagram.topMedia.slice(0, 4).map((item) => (
              <a
                key={item.id}
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg bg-slate-100/70 p-3 transition-colors hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <div className="h-14 w-14 overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800">
                  {item.thumbnailUrl ? (
                    <img src={item.thumbnailUrl} alt={getMediaTitle(item)} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-500">
                      <FaCameraRetro />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{getMediaTitle(item)}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {content.reach}: {formatCompactNumber(item.insights?.reach || 0)} · {content.likes}: {formatCompactNumber(item.likeCount)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-slate-100/70 p-5 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-400">
            {content.noLiveInsights}
          </div>
        )}
      </DataPanel>
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

        if (!response.ok) throw new Error('Instagram stats endpoint is not available')

        const payload = await response.json()

        if (!payload.configured || payload.error) {
          throw new Error(payload.error || 'Instagram stats are not configured')
        }

        if (isMounted) {
          setInstagramStats(payload)
          setStatus('live')
        }
      } catch {
        if (isMounted) setStatus('unavailable')
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
              <MetricCard icon={FaUsers} label={content.followers} value={formatNumber(profile.followers)} description={`@${profile.username}`} />
              <MetricCard icon={FaCameraRetro} label={content.posts} value={formatNumber(profile.mediaCount)} accent="purple" />
              <MetricCard icon={FaEye} label={content.profileViews} value={formatNumber(insights.profileViews)} accent="emerald" />
              <MetricCard icon={FaBullseye} label={content.reach} value={formatNumber(insights.latestReach)} accent="rose" />
            </div>

            <div className="glass-effect rounded-lg p-5 sm:p-6">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{content.chartTitle}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{content.chartSubtitle}</p>
                </div>
                <p className="text-3xl font-bold text-gradient">{formatCompactNumber(insights.latestReach)}</p>
              </div>

              <ReachChart points={insights.reach} content={content} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <MediaGrid media={instagram.media} content={content} />
        </div>

        <InsightsPanels instagram={instagram} content={content} />
      </div>
    </section>
  )
}

MetricCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  accent: PropTypes.oneOf(['blue', 'purple', 'emerald', 'rose']),
  description: PropTypes.string,
}

ReachChart.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      endTime: PropTypes.string,
    })
  ),
  content: PropTypes.object.isRequired,
}

MoreDataPanel.propTypes = {
  content: PropTypes.object.isRequired,
}

DataPoint.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
}

DataPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

ProfileActionsPanel.propTypes = {
  actions: PropTypes.object,
  content: PropTypes.object.isRequired,
}

EngagementPanel.propTypes = {
  engagement: PropTypes.object,
  content: PropTypes.object.isRequired,
}

AudienceActivityPanel.propTypes = {
  audience: PropTypes.object,
  content: PropTypes.object.isRequired,
}

InsightsPanels.propTypes = {
  instagram: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
}

MediaMetric.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
}

MediaCard.propTypes = {
  item: PropTypes.shape({
    caption: PropTypes.string,
    commentsCount: PropTypes.number,
    id: PropTypes.string.isRequired,
    insights: PropTypes.object,
    likeCount: PropTypes.number,
    mediaProductType: PropTypes.string,
    mediaType: PropTypes.string,
    permalink: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string,
  }).isRequired,
  content: PropTypes.object.isRequired,
}

MediaGrid.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object),
  content: PropTypes.object.isRequired,
}

SocialStats.propTypes = {
  data: PropTypes.object,
}

export default SocialStats
