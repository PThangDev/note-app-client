const routePaths = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    activeAccount: '/auth/active/:activeToken',
  },
  topics: '/topics',
  notes: {
    main: '/notes',
    detail: '/notes/:id',
    detailSlug: '/notes/:id/:slug',
  },
  pins: '/pins',
  profile: '/profile',
  search: '/search',
};
export default routePaths;
