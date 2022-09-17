import { lazy } from 'react';
import DefaultLayout from 'src/layouts/DefaultLayout';
import { PrivateRouter } from '../components/OuterRoute';

const HomePage = lazy(() => import('src/pages/home'));

const privateRoutes = [
  {
    path: '/',
    component: HomePage,
    layout: DefaultLayout,
    outer: PrivateRouter,
  },
];

export default privateRoutes;
