import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  FaBolt,
  FaBullseye,
  FaCameraRetro,
  FaChartLine,
  FaDownload,
  FaEye,
  FaGlobeAmericas,
  FaSignal,
  FaUsers,
  FaVenusMars,
} from 'react-icons/fa'
import { socialMock } from '../../data/socialMock'
import { useLanguage } from '../../context/LanguageContext'
import { profile as personalProfile } from '../../data/profile'

const labels = {
  en: {
    title: 'Social',
    highlight: 'Media',
    eyebrow: 'Instagram Media Kit',
    subtitle: 'Performance, audience and statistical insights from my Instagram professional account.',
    overview: 'Instagram Creator Overview',
    overviewCopy: 'A performance-first snapshot for brands and collaborations.',
    audience: 'Audience Overview',
    audienceCopy: 'Who the content reaches and the audience signals available from Meta.',
    topContent: 'Top Performing Content',
    topContentCopy: 'Selected reels with the highest organic reach and engagement.',
    statisticalInsights: 'Statistical Insights',
    statisticalCopy: 'Individual reel analysis based on reach, shares, saves and engagement rate.',
    globalAnalytics: 'Global Analytics',
    globalCopy: 'Scientific-style signals across the highest performing content.',
    liveDashboard: 'Live Instagram Dashboard',
    liveCopy: 'Latest connected Meta Graph API values and daily reach trend.',
    downloadMediaKit: 'Download Media Kit',
    followers: 'Followers',
    reach30: '30-day reach',
    profileViews: 'Profile views',
    engagementRate: 'Engagement rate',
    posts: 'Posts',
    accountsReached: 'Accounts reached',
    monthlyGrowth: 'Monthly growth',
    countries: 'Countries',
    age: 'Age',
    gender: 'Gender',
    views: 'Views',
    reach: 'Reach',
    likes: 'Likes',
    comments: 'Comments',
    shares: 'Shares',
    saves: 'Saves',
    er: 'ER',
    live: 'Live',
    syncing: 'Syncing',
    unavailable: 'Cached',
    tracking: 'Tracking',
    noData: 'Data will appear after Meta returns enough audience information.',
    profileAlt: 'Instagram profile',
    openProfile: 'Open Instagram profile',
    profileBio: 'Professional Instagram account connected through Meta Graph API.',
    average: 'Average',
    median: 'Median',
    highest: 'Highest',
    outlier: 'Outlier',
    correlation: 'Correlation',
    prediction: 'Prediction',
    distribution: 'Distribution',
  },
  es: {
    title: 'Redes',
    highlight: 'Sociales',
    eyebrow: 'Instagram Media Kit',
    subtitle: 'Rendimiento, audiencia e insights estadísticos desde mi cuenta profesional de Instagram.',
    overview: 'Instagram Creator Overview',
    overviewCopy: 'Resumen enfocado en resultados para marcas y colaboraciones.',
    audience: 'Audience Overview',
    audienceCopy: 'A quién llega el contenido y señales de audiencia disponibles desde Meta.',
    topContent: 'Top Performing Content',
    topContentCopy: 'Reels seleccionados por mayor alcance orgánico e interacción.',
    statisticalInsights: 'Statistical Insights',
    statisticalCopy: 'Análisis individual por reel basado en alcance, compartidos, guardados y engagement rate.',
    globalAnalytics: 'Global Analytics',
    globalCopy: 'Señales tipo data science sobre el contenido de mayor rendimiento.',
    liveDashboard: 'Live Instagram Dashboard',
    liveCopy: 'Valores conectados a Meta Graph API y tendencia diaria de alcance.',
    downloadMediaKit: 'Download Media Kit',
    followers: 'Seguidores',
    reach30: 'Alcance 30 dias',
    profileViews: 'Visitas al perfil',
    engagementRate: 'Engagement rate',
    posts: 'Publicaciones',
    accountsReached: 'Cuentas alcanzadas',
    monthlyGrowth: 'Crecimiento mensual',
    countries: 'Paises',
    age: 'Edad',
    gender: 'Genero',
    views: 'Views',
    reach: 'Alcance',
    likes: 'Likes',
    comments: 'Comentarios',
    shares: 'Compartidos',
    saves: 'Guardados',
    er: 'ER',
    live: 'En vivo',
    syncing: 'Sincronizando',
    unavailable: 'Cache',
    tracking: 'Tracking',
    noData: 'La data aparecera cuando Meta devuelva suficiente informacion de audiencia.',
    profileAlt: 'Perfil de Instagram',
    openProfile: 'Abrir perfil de Instagram',
    profileBio: 'Cuenta profesional de Instagram conectada mediante Meta Graph API.',
    average: 'Promedio',
    median: 'Mediana',
    highest: 'Mas alto',
    outlier: 'Outlier',
    correlation: 'Correlacion',
    prediction: 'Prediccion',
    distribution: 'Distribucion',
  },
}

const formatNumber = (value) => new Intl.NumberFormat('en').format(Math.round(value || 0))

const formatCompactNumber = (value) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value || 0)

const formatPercent = (value) => `${Number.isFinite(value) ? value.toFixed(value >= 10 ? 1 : 2) : '0.00'}%`

const formatChartDate = (value) => {
  if (!value) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

const sum = (items) => items.reduce((total, value) => total + (Number(value) || 0), 0)

const average = (items) => (items.length ? sum(items) / items.length : 0)

const median = (items) => {
  if (!items.length) return 0
  const sorted = [...items].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

const pearson = (items, getX, getY) => {
  const points = items
    .map((item) => [Number(getX(item)) || 0, Number(getY(item)) || 0])
    .filter(([x, y]) => x > 0 && y > 0)

  if (points.length < 2) return 0

  const avgX = average(points.map(([x]) => x))
  const avgY = average(points.map(([, y]) => y))
  const numerator = sum(points.map(([x, y]) => (x - avgX) * (y - avgY)))
  const denominatorX = Math.sqrt(sum(points.map(([x]) => (x - avgX) ** 2)))
  const denominatorY = Math.sqrt(sum(points.map(([, y]) => (y - avgY) ** 2)))

  return denominatorX && denominatorY ? numerator / (denominatorX * denominatorY) : 0
}

const getFallbackInstagram = (data) => ({
  profile: {
    username: data.summary.instagram.handle.replace('@', ''),
    name: personalProfile.name,
    followers: data.summary.instagram.followers,
    mediaCount: data.summary.instagram.posts,
    profilePictureUrl: personalProfile.image,
  },
  insights: {
    profileViews: data.summary.instagram.profileViews || 247,
    latestReach: data.summary.instagram.reach || data.trends.instagram.at(-1) || 0,
    reach: data.trends.instagram.map((value, index) => ({
      value,
      endTime: new Date(Date.now() - (data.trends.instagram.length - index - 1) * 86400000).toISOString(),
    })),
  },
  media: [],
  topMedia: [],
  accountInsights: {
    engagement: {},
    audienceActivity: {
      followerDemographics: [],
      countryDemographics: [],
    },
  },
})

const buildInstagramData = (baseData, instagramStats) => {
  if (instagramStats?.profile && instagramStats?.insights) return instagramStats
  return getFallbackInstagram(baseData)
}

const getViews = (media) => media.insights?.views ?? media.insights?.plays ?? 0
const getReach = (media) => media.insights?.reach ?? 0
const getShares = (media) => media.insights?.shares ?? 0
const getSaves = (media) => media.insights?.saved ?? 0
const getInteractions = (media) => (media.likeCount || 0) + (media.commentsCount || 0) + getShares(media) + getSaves(media)
const getEngagementRate = (media) => {
  const reach = getReach(media)
  return reach ? (getInteractions(media) / reach) * 100 : 0
}

const getMediaTitle = (media) => {
  const cleanCaption = media.caption?.replace(/\s+/g, ' ').trim()
  if (!cleanCaption) return media.mediaProductType || media.mediaType || 'Instagram media'
  return cleanCaption.length > 72 ? `${cleanCaption.slice(0, 72)}...` : cleanCaption
}

const getAudienceBreakdowns = (audience = {}) => {
  const ageGender = audience.followerDemographics?.[0]?.results || []
  const countries = audience.countryDemographics?.[0]?.results || []
  const ageTotals = new Map()
  const genderTotals = new Map()

  ageGender.forEach((item) => {
    const [age, gender] = item.dimension_values || []
    const value = item.value || 0

    if (age) ageTotals.set(age, (ageTotals.get(age) || 0) + value)
    if (gender) genderTotals.set(gender, (genderTotals.get(gender) || 0) + value)
  })

  return {
    age: [...ageTotals.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 5),
    gender: [...genderTotals.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    countries: countries
      .map((item) => ({ label: item.dimension_values?.[0] || 'Unknown', value: item.value || 0 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5),
  }
}

const getAnalytics = (media) => {
  const engagementRates = media.map(getEngagementRate).filter((value) => value > 0)
  const avgEr = average(engagementRates)
  const medianEr = median(engagementRates)
  const highestErMedia = media.reduce((best, item) => (getEngagementRate(item) > getEngagementRate(best || {}) ? item : best), null)
  const viewsSharesCorrelation = pearson(media, getViews, getShares)
  const reachEngagementCorrelation = pearson(media, getReach, getEngagementRate)
  const likesViewsCorrelation = pearson(media, (item) => item.likeCount, getViews)
  const avgShares = average(media.map(getShares).filter(Boolean))
  const estimatedFollowersPerThousandShares = Math.max(1, Math.round((avgShares || 1000) / 1000 * 8))

  return {
    avgEr,
    medianEr,
    highestErMedia,
    highestEr: highestErMedia ? getEngagementRate(highestErMedia) : 0,
    outlier: highestErMedia,
    correlations: [
      { label: 'Likes - Views', value: likesViewsCorrelation },
      { label: 'Shares - Views', value: viewsSharesCorrelation },
      { label: 'Reach - ER', value: reachEngagementCorrelation },
    ],
    estimatedFollowersPerThousandShares,
  }
}

const SectionHeader = ({ title, copy }) => (
  <div className="mb-5">
    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">{copy}</p>
  </div>
)

const MetricCard = ({ icon: Icon, label, value, accent = 'blue', description }) => {
  const accentStyles = {
    blue: 'from-blue-500/20 to-cyan-500/10 text-blue-500 dark:text-blue-300',
    purple: 'from-purple-500/20 to-fuchsia-500/10 text-purple-500 dark:text-purple-300',
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-500 dark:text-emerald-300',
    rose: 'from-rose-500/20 to-pink-500/10 text-rose-500 dark:text-rose-300',
  }

  return (
    <div className="glass-effect min-w-0 rounded-lg p-5">
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${accentStyles[accent]}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 break-words text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      {description && <p className="mt-2 break-words text-xs text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
  )
}

const ProgressList = ({ items, emptyLabel }) => {
  const max = Math.max(...items.map((item) => item.value), 1)

  if (!items.length) {
    return <div className="rounded-lg bg-slate-100/70 p-4 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-400">{emptyLabel}</div>
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)_4rem] items-center gap-3">
          <span className="truncate text-sm font-medium text-slate-600 dark:text-slate-300">{item.label}</span>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${Math.max((item.value / max) * 100, 4)}%` }} />
          </div>
          <span className="text-right text-xs font-bold text-slate-700 dark:text-slate-200">{formatCompactNumber(item.value)}</span>
        </div>
      ))}
    </div>
  )
}

const MiniSparkline = ({ values }) => {
  const safeValues = values.length ? values : [0, 0]
  const max = Math.max(...safeValues, 1)
  const min = Math.min(...safeValues)
  const range = max - min || 1
  const points = safeValues.map((value, index) => {
    const x = safeValues.length === 1 ? 50 : (index / (safeValues.length - 1)) * 100
    const y = 90 - ((value - min) / range) * 70
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 100 100" className="h-20 w-full overflow-visible" role="img" aria-label="Performance sparkline">
      <polyline fill="none" stroke="url(#sparklineGradient)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" points={points} />
      <defs>
        <linearGradient id="sparklineGradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const ReachChart = ({ points, content }) => {
  if (!points?.length) return null

  const recentPoints = points.slice(-30)
  const values = recentPoints.map((point) => point.value)
  const max = Math.max(...values, 1)
  const latest = recentPoints.at(-1)?.value || 0
  const previous = recentPoints.at(-2)?.value || 0
  const change = previous ? ((latest - previous) / previous) * 100 : 0

  return (
    <div className="min-w-0 rounded-lg border border-slate-200/70 bg-white/40 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400">{content.highest}</p>
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{formatCompactNumber(max)}</p>
        </div>
        <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400">Latest</p>
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{formatCompactNumber(latest)}</p>
        </div>
        <div className="rounded-lg bg-slate-100/70 p-3 dark:bg-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400">Change</p>
          <p className={`mt-1 text-lg font-bold ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recentPoints.slice(-7).map((point, index) => {
          const width = Math.max((point.value / max) * 100, 3)
          const isLatest = index === recentPoints.slice(-7).length - 1

          return (
            <div key={`${point.endTime}-${point.value}`} className="grid min-w-0 grid-cols-[3.75rem_minmax(0,1fr)_3.5rem] items-center gap-2 sm:grid-cols-[4.25rem_minmax(0,1fr)_4rem] sm:gap-3">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{formatChartDate(point.endTime)}</span>
              <div className="h-4 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${isLatest ? 'from-blue-500 to-purple-500' : 'from-blue-400/70 to-blue-500/70'}`}
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

const CreatorOverview = ({ instagram, media, content, statusLabel }) => {
  const profile = instagram.profile
  const reach30 = sum((instagram.insights.reach || []).map((item) => item.value))
  const avgEr = average(media.map(getEngagementRate).filter(Boolean))
  const instagramUrl = `https://www.instagram.com/${profile.username}/`

  return (
    <section className="space-y-6">
      <SectionHeader title={content.overview} copy={content.overviewCopy} />
      <div className="grid min-w-0 gap-6 lg:grid-cols-[0.9fr_1.4fr]">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-effect group flex min-h-full min-w-0 flex-col justify-between rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-200/50 dark:hover:bg-white/10 sm:p-6"
          aria-label={content.openProfile}
        >
          <div>
            <div className="mb-6 flex min-w-0 flex-col gap-4 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 sm:h-20 sm:w-20">
                  <img src={profile.profilePictureUrl || personalProfile.image} alt={content.profileAlt} className="h-full w-full rounded-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-2xl font-bold text-slate-900 dark:text-white">{profile.name}</h3>
                  <p className="truncate text-slate-500 dark:text-slate-400">@{profile.username}</p>
                </div>
              </div>
              <span className="w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500 dark:text-blue-300">
                {statusLabel}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">{content.profileBio}</p>
          </div>
          <div className="mt-8 min-w-0 rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
            <div className="flex min-w-0 flex-col gap-4 min-[420px]:flex-row min-[420px]:items-end min-[420px]:justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{content.followers}</p>
                <p className="mt-1 text-4xl font-bold text-slate-900 dark:text-white">{formatCompactNumber(profile.followers)}</p>
              </div>
              <span className="break-words text-sm font-medium text-blue-500 dark:text-blue-300">@{profile.username}</span>
            </div>
          </div>
        </a>

        <div className="grid min-w-0 gap-6 sm:grid-cols-2">
          <MetricCard icon={FaUsers} label={content.followers} value={formatNumber(profile.followers)} description={`@${profile.username}`} />
          <MetricCard icon={FaSignal} label={content.reach30} value={formatCompactNumber(reach30 || instagram.insights.latestReach)} accent="purple" />
          <MetricCard icon={FaEye} label={content.profileViews} value={formatNumber(instagram.insights.profileViews)} accent="emerald" />
          <MetricCard icon={FaBolt} label={content.engagementRate} value={formatPercent(avgEr)} accent="rose" description={media.length ? `${media.length} top reels analyzed` : content.tracking} />
        </div>
      </div>
    </section>
  )
}

const AudienceOverview = ({ instagram, content }) => {
  const audience = getAudienceBreakdowns(instagram.accountInsights?.audienceActivity)
  const reach30 = sum((instagram.insights.reach || []).map((item) => item.value))

  return (
    <section className="glass-effect min-w-0 rounded-lg p-4 sm:p-6">
      <SectionHeader title={content.audience} copy={content.audienceCopy} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={FaUsers} label={content.followers} value={formatNumber(instagram.profile.followers)} />
        <MetricCard icon={FaBullseye} label={content.accountsReached} value={formatCompactNumber(reach30 || instagram.insights.latestReach)} accent="purple" />
        <MetricCard icon={FaEye} label={content.profileViews} value={formatNumber(instagram.insights.profileViews)} accent="emerald" />
        <MetricCard icon={FaChartLine} label={content.monthlyGrowth} value={content.tracking} accent="rose" />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
          <h4 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><FaGlobeAmericas /> {content.countries}</h4>
          <ProgressList items={audience.countries} emptyLabel={content.noData} />
        </div>
        <div className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
          <h4 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><FaUsers /> {content.age}</h4>
          <ProgressList items={audience.age} emptyLabel={content.noData} />
        </div>
        <div className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
          <h4 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><FaVenusMars /> {content.gender}</h4>
          <ProgressList items={audience.gender} emptyLabel={content.noData} />
        </div>
      </div>
    </section>
  )
}

const ContentMetric = ({ label, value }) => (
  <div className="rounded-lg bg-slate-100/80 px-3 py-2 dark:bg-white/10">
    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{value}</p>
  </div>
)

const TopContentCard = ({ item, content }) => (
  <a
    href={item.permalink}
    target="_blank"
    rel="noopener noreferrer"
    className="group mx-auto w-full max-w-[22rem] overflow-hidden rounded-lg border border-slate-200/70 bg-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] sm:max-w-none"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-slate-200 dark:bg-slate-800">
      {item.thumbnailUrl ? (
        <img src={item.thumbnailUrl} alt={getMediaTitle(item)} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-500 dark:text-slate-400">
          <FaCameraRetro className="h-8 w-8" />
        </div>
      )}
      <div className="absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
        {item.mediaProductType || item.mediaType}
      </div>
    </div>
    <div className="min-w-0 p-4">
      <p className="line-clamp-2 min-h-[2.5rem] break-words text-sm font-semibold text-slate-900 dark:text-white">{getMediaTitle(item)}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <ContentMetric label={content.views} value={formatCompactNumber(getViews(item))} />
        <ContentMetric label={content.reach} value={formatCompactNumber(getReach(item))} />
        <ContentMetric label={content.likes} value={formatCompactNumber(item.likeCount)} />
        <ContentMetric label={content.shares} value={formatCompactNumber(getShares(item))} />
        <ContentMetric label={content.saves} value={formatCompactNumber(getSaves(item))} />
        <ContentMetric label={content.er} value={formatPercent(getEngagementRate(item))} />
      </div>
    </div>
  </a>
)

const TopPerformingContent = ({ media, content }) => (
  <section className="glass-effect min-w-0 rounded-lg p-4 sm:p-6">
    <SectionHeader title={content.topContent} copy={content.topContentCopy} />
    {media.length ? (
      <div className="grid min-w-0 grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <TopContentCard key={item.id} item={item} content={content} />
        ))}
      </div>
    ) : (
      <div className="rounded-lg bg-slate-100/70 p-5 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-400">{content.noData}</div>
    )}
  </section>
)

const StatisticalInsights = ({ media, content }) => {
  const sorted = [...media].sort((a, b) => getEngagementRate(b) - getEngagementRate(a)).slice(0, 4)

  return (
    <section className="glass-effect min-w-0 rounded-lg p-4 sm:p-6">
      <SectionHeader title={content.statisticalInsights} copy={content.statisticalCopy} />
      <div className="grid gap-4 lg:grid-cols-2">
        {sorted.map((item, index) => {
          const er = getEngagementRate(item)
          const values = [item.likeCount, item.commentsCount, getSaves(item), getShares(item), getReach(item), getViews(item)]
          const insight = index === 0
            ? 'Highest engagement among analyzed reels, demonstrating exceptional audience resonance and strong viral potential.'
            : getShares(item) > getSaves(item)
              ? 'Strong shareability signal, indicating content that audiences actively distribute to new viewers.'
              : 'Strong save behavior, showing practical value and repeat-view potential for the audience.'

          return (
            <article key={item.id} className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
              <div className="flex min-w-0 gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                  {item.thumbnailUrl ? <img src={item.thumbnailUrl} alt={getMediaTitle(item)} className="h-full w-full object-cover" loading="lazy" /> : <FaCameraRetro />}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-semibold text-slate-900 dark:text-white">{getMediaTitle(item)}</h4>
                  <p className="mt-1 text-2xl font-bold text-gradient">{formatPercent(er)} {content.er}</p>
                </div>
              </div>
              <MiniSparkline values={values} />
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-300">Insight</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{insight}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

const GlobalAnalytics = ({ media, content }) => {
  const analytics = getAnalytics(media)
  const erValues = media.map(getEngagementRate).filter(Boolean)

  return (
    <section className="glass-effect min-w-0 rounded-lg p-4 sm:p-6">
      <SectionHeader title={content.globalAnalytics} copy={content.globalCopy} />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
          <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">{content.correlation}</h4>
          <div className="space-y-3">
            {analytics.correlations.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{item.value.toFixed(2)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${Math.max(Math.abs(item.value) * 100, 4)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
          <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">{content.prediction}</h4>
          <div className="rounded-lg bg-white/60 p-4 text-center dark:bg-slate-900/40">
            <p className="text-sm text-slate-500 dark:text-slate-400">1,000 {content.shares}</p>
            <p className="my-3 text-3xl font-bold text-gradient">=</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">~{analytics.estimatedFollowersPerThousandShares}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">estimated new followers</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Reels with higher shares show stronger distribution potential across analyzed content.</p>
        </div>
        <div className="rounded-lg bg-slate-100/70 p-4 dark:bg-white/5">
          <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">{content.distribution}</h4>
          <div className="grid grid-cols-2 gap-3">
            <ContentMetric label={content.average} value={formatPercent(analytics.avgEr)} />
            <ContentMetric label={content.median} value={formatPercent(analytics.medianEr)} />
            <ContentMetric label={content.highest} value={formatPercent(analytics.highestEr)} />
            <ContentMetric label={content.outlier} value={analytics.outlier ? formatCompactNumber(getViews(analytics.outlier)) : '--'} />
          </div>
          <MiniSparkline values={erValues} />
        </div>
      </div>
    </section>
  )
}

const LiveDashboard = ({ instagram, content }) => (
  <section className="glass-effect min-w-0 rounded-lg p-4 sm:p-6">
    <SectionHeader title={content.liveDashboard} copy={content.liveCopy} />
    <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <MetricCard icon={FaCameraRetro} label={content.posts} value={formatNumber(instagram.profile.mediaCount)} />
        <MetricCard icon={FaBullseye} label={content.reach} value={formatCompactNumber(instagram.insights.latestReach)} accent="rose" />
      </div>
      <ReachChart points={instagram.insights.reach} content={content} />
    </div>
  </section>
)

const DownloadMediaKit = ({ instagram, media, content }) => {
  const handleDownload = () => {
    const topLines = media.slice(0, 6).map((item, index) => (
      `${index + 1}. ${getMediaTitle(item)} | Views: ${formatNumber(getViews(item))} | Reach: ${formatNumber(getReach(item))} | ER: ${formatPercent(getEngagementRate(item))}`
    ))
    const text = [
      'Juan Pablo - Instagram Media Kit',
      `Instagram: @${instagram.profile.username}`,
      `Followers: ${formatNumber(instagram.profile.followers)}`,
      `Profile views: ${formatNumber(instagram.insights.profileViews)}`,
      `30-day reach: ${formatNumber(sum((instagram.insights.reach || []).map((item) => item.value)))}`,
      '',
      'Top Performing Content',
      ...topLines,
    ].join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'juan-pablo-instagram-media-kit.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white shadow-lg">
      <h3 className="text-2xl font-bold">Media Kit</h3>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-white/85">Download a compact snapshot with audience, performance and top content metrics.</p>
      <button
        type="button"
        onClick={handleDownload}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-white px-6 py-3 font-bold text-slate-900 transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
      >
        <FaDownload />
        {content.downloadMediaKit}
      </button>
    </section>
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
          setStatus(payload.stale ? 'stale' : 'live')
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
  const topMedia = instagram.topMedia?.length ? instagram.topMedia : instagram.media || []
  const statusLabel = status === 'live' ? content.live : status === 'loading' ? content.syncing : content.unavailable

  return (
    <section id="social-stats" className="w-full overflow-x-hidden px-4 py-20">
      <div className="mx-auto max-w-6xl min-w-0 space-y-8">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-500 dark:text-blue-400">{content.eyebrow}</p>
          <h2 className="mb-4 text-4xl font-bold">
            {content.title} <span className="text-gradient">{content.highlight}</span>
          </h2>
          <div className="mx-auto mb-4 h-1 w-20 bg-blue-500" />
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-400">{content.subtitle}</p>
        </div>

        <CreatorOverview instagram={instagram} media={topMedia} content={content} statusLabel={statusLabel} />
        <AudienceOverview instagram={instagram} content={content} />
        <TopPerformingContent media={topMedia} content={content} />
        <StatisticalInsights media={topMedia} content={content} />
        <GlobalAnalytics media={topMedia} content={content} />
        <LiveDashboard instagram={instagram} content={content} />
        <DownloadMediaKit instagram={instagram} media={topMedia} content={content} />
      </div>
    </section>
  )
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
}

MetricCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  accent: PropTypes.oneOf(['blue', 'purple', 'emerald', 'rose']),
  description: PropTypes.string,
}

ProgressList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })).isRequired,
  emptyLabel: PropTypes.string.isRequired,
}

MiniSparkline.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
}

ReachChart.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number, endTime: PropTypes.string })),
  content: PropTypes.object.isRequired,
}

CreatorOverview.propTypes = {
  instagram: PropTypes.object.isRequired,
  media: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.object.isRequired,
  statusLabel: PropTypes.string.isRequired,
}

AudienceOverview.propTypes = {
  instagram: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
}

ContentMetric.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

TopContentCard.propTypes = {
  item: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
}

TopPerformingContent.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.object.isRequired,
}

StatisticalInsights.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.object.isRequired,
}

GlobalAnalytics.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.object.isRequired,
}

LiveDashboard.propTypes = {
  instagram: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
}

DownloadMediaKit.propTypes = {
  instagram: PropTypes.object.isRequired,
  media: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.object.isRequired,
}

SocialStats.propTypes = {
  data: PropTypes.object,
}

export default SocialStats
