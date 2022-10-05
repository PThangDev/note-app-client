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
  topicDetail: {
    path: '/topics/:id/:slug',
    label: 'Topic Detail',
  },
  topicDetailRouter: {
    path: '/topics/:id',
    label: 'Topic Detail Render',
  },
  notes: {
    path: '/notes',
    label: 'Notes',
  },
  newNote: {
    path: '/notes/new',
    label: 'New Note',
  },
  editNote: {
    path: '/notes/edit/:id',
    label: 'Edit Note',
  },
  noteDetail: {
    path: '/notes/:id/:slug',
    label: 'Note Detail',
  },
  noteDetailRouter: {
    path: '/notes/:id',
    label: 'Note Detail Router',
  },
  pins: {
    path: '/pins',
    label: 'Pins',
  },
  others: {
    path: '/others',
    label: 'Others',
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
} as const;
export default routePaths;
