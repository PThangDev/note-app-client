import authRoutes from './authRoutes';
import privateRoutes from './privateRoutes';

const routes = [...authRoutes, ...privateRoutes];

export default routes;
