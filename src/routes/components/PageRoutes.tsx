import { Route } from 'react-router-dom';

import EmptyLayout from 'src/layouts/EmptyLayout';
import routes from '../configs/routes';
import LoadingRoutes from './LoadingRoutes';

const PageRoutes = () => {
  return (
    <LoadingRoutes>
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
    </LoadingRoutes>
  );
};
export default PageRoutes;
