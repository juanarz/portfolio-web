export const socialMock = {
  summary: {
    twitter: { handle: '@juan', followers: 1234, following: 210, posts: 432 },
    github: { handle: 'juanarz', followers: 98, repos: 24 },
    youtube: { channel: 'juan channel', subscribers: 5420, views: 123456 },
    instagram: {
      handle: '@juan_aarias',
      followers: 42225,
      posts: 168,
      profileViews: 247,
      reach: 19050,
    },
  },
  recent: [
    {
      platform: 'twitter',
      date: '2026-06-01',
      text: 'Lanzando un nuevo proyecto con Vite + Tailwind!',
      likes: 24,
      comments: 3,
    },
    {
      platform: 'instagram',
      date: '2026-05-28',
      text: 'Snapshots del último diseño de UI 🎨',
      likes: 120,
      comments: 12,
    },
    {
      platform: 'github',
      date: '2026-05-20',
      text: 'Actualicé la lib de utilidades y arreglé bugs',
      stars: 5,
    },
  ],
  trends: {
    // small arrays to render mini sparklines (last 7 days)
    twitter: [12, 14, 13, 17, 20, 22, 24],
    instagram: [75929, 19050],
    github: [0, 1, 0, 2, 3, 0, 5],
    youtube: [40, 42, 45, 48, 50, 52, 54],
  },
}

export default socialMock
