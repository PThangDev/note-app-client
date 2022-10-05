const routePaths = {
  // Home
  home: '/',
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  activeAccount: '/auth/active/:activeToken',
  // Topics
  topics: '/topics',
  topicDetail: '/topics/:id/:slug',
  topicDetailRouter: '/topics/:id',
  // Notes
  notes: '/notes',
  noteDetail: '/notes/:id/:slug',
  noteDetailRouter: '/notes/:id',
  newNote: '/notes/new',
  editNote: '/notes/edit/:id',
  // Pins
  pins: '/pins',
  // Others
  others: '/others',
  // Trashs
  trashs: '/trashs',
  // Profile
  profile: '/profile',
  // Search
  search: '/search',
} as const;
export default routePaths;
