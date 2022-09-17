import { Route, Routes } from 'react-router-dom';
import EmptyLayout from 'src/layouts/EmptyLayout';
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
    </Routes>
  );
};
export default PageRoutes;
