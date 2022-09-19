const routePaths = {
  home: {
    path: '/',
    label: 'Home',
  },
  auth: {
    login: {
      path: '/auth/login',
      label: 'Login',
    },
    register: {
      path: '/auth/register',
      label: 'Register',
    },
    forgotPassword: {
      path: '/auth/forgot-password',
      label: 'Forgot Password',
    },
    activeAccount: {
      path: '/auth/active/:activeToken',
      label: 'Active Account',
    },
  },
  topics: {
    path: '/topics',
    label: 'Topics',
  },
  notes: {
    path: '/notes',
    label: 'Notes',
  },
  pins: {
    path: '/pins',
    label: 'Pins',
  },
  trashs: {
    path: '/trashs',
    label: 'Trashs',
  },
  profile: {
    path: '/profile',
    label: 'Profile',
  },
  search: {
    path: '/search',
    label: 'Search',
  },
};
export default routePaths;
