import { lazy } from 'react';

import { routePaths } from 'src/configs';
import DefaultLayout from 'src/layouts/DefaultLayout';
import { PrivateRouter } from '../components/OuterRoute';
const HomePage = lazy(() => import('src/pages/home'));
const NotesPage = lazy(() => import('src/pages/notes'));
const TopicsPage = lazy(() => import('src/pages/topics'));
const PinsPage = lazy(() => import('src/pages/pins'));
const TrashsPage = lazy(() => import('src/pages/trashs'));
const ProfilePage = lazy(() => import('src/pages/profile'));

const privateRoutes = [
  {
    path: routePaths.home,
    component: HomePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.notes.main,
    component: NotesPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.topics,
    component: TopicsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.pins,
    component: PinsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.profile,
    component: ProfilePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.trashs,
    component: TrashsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
];

export default privateRoutes;
