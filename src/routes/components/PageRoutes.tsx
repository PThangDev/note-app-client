import { Route, Routes } from 'react-router-dom';

import EmptyLayout from 'src/layouts/EmptyLayout';
import NotFoundPage from 'src/pages/notfound';
import routes from '../configs/routes';

const PageRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const {
          path,
          component: Component,
          layout: Layout = EmptyLayout,
          outer: OuterRoute,
        } = route;
        return (
          <Route
            key={path}
            path={path}
            element={
              <OuterRoute>
                <Layout>
                  <Component />
                </Layout>
              </OuterRoute>
            }
          />
        );
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default PageRoutes;
