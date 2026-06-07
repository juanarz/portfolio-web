import PropTypes from 'prop-types'
import { socialMock } from '../../data/socialMock'

const Sparkline = ({ points = [] }) => {
  if (!points || points.length === 0) return null
  const width = 120
  const height = 32
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1

  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} className="block">
      <path d={path} fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const StatCard = ({ title, value, subtitle, spark }) => (
  <div className="glass-effect p-5 rounded-lg flex flex-col justify-between">
    <div>
      <div className="text-sm text-slate-400 dark:text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {subtitle && <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</div>}
    </div>
    {spark && (
      <div className="mt-4">
        <Sparkline points={spark} />
      </div>
    )}
  </div>
)

const RecentItem = ({ item }) => {
  return (
    <div className="p-4 rounded-lg bg-white/5 dark:bg-slate-800/40">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-slate-400 capitalize">{item.platform}</div>
          <div className="font-medium mt-1 text-sm">{item.text}</div>
        </div>
        <div className="text-xs text-slate-400">{item.date}</div>
      </div>
      <div className="mt-3 text-sm text-slate-500">
        {item.likes !== undefined && <span className="mr-3">💙 {item.likes}</span>}
        {item.comments !== undefined && <span className="mr-3">💬 {item.comments}</span>}
        {item.stars !== undefined && <span className="mr-3">⭐ {item.stars}</span>}
      </div>
    </div>
  )
}

const SocialStats = ({ data = socialMock }) => {
  const { summary, recent, trends } = data

  return (
    <section id="social-stats" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold">Social Media</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Latest numbers and recent activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Twitter"
            value={summary.twitter.followers.toLocaleString()}
            subtitle={`${summary.twitter.posts} posts · ${summary.twitter.following} following`}
            spark={trends.twitter}
          />

          <StatCard
            title="Instagram"
            value={summary.instagram.followers.toLocaleString()}
            subtitle={`${summary.instagram.posts} posts`}
            spark={trends.instagram}
          />

          <StatCard
            title="GitHub"
            value={summary.github.followers}
            subtitle={`${summary.github.repos} repos`}
            spark={trends.github}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {recent.map((r, i) => (
              <RecentItem key={i} item={r} />
            ))}
          </div>

          <div>
            <div className="glass-effect p-5 rounded-lg">
              <div className="text-sm text-slate-400">YouTube</div>
              <div className="mt-2 text-2xl font-bold">{summary.youtube.subscribers.toLocaleString()}</div>
              <div className="text-sm text-slate-500 mt-1">{summary.youtube.views.toLocaleString()} views</div>
              <div className="mt-4">
                <Sparkline points={trends.youtube} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

SocialStats.propTypes = {
  data: PropTypes.object,
}

export default SocialStats

// Prop types for subcomponents
Sparkline.propTypes = {
  points: PropTypes.arrayOf(PropTypes.number),
}

StatCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
  subtitle: PropTypes.string,
  spark: PropTypes.arrayOf(PropTypes.number),
}

RecentItem.propTypes = {
  item: PropTypes.shape({
    platform: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.number,
    stars: PropTypes.number,
  }).isRequired,
}
