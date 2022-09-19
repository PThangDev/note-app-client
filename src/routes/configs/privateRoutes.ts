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
    path: routePaths.home.path,
    component: HomePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.notes.path,
    component: NotesPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.topics.path,
    component: TopicsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.pins.path,
    component: PinsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.profile.path,
    component: ProfilePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
  {
    path: routePaths.trashs.path,
    component: TrashsPage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
];

export default privateRoutes;
