import { Fragment, lazy } from 'react';

import EmptyLayout from 'src/layouts/EmptyLayout';
const NotFoundPage = lazy(() => import('src/pages/notfound'));

const publicRoutes = [
  {
    path: '*',
    component: NotFoundPage,
    layout: EmptyLayout,
    outer: Fragment,
  },
];

export default publicRoutes;
