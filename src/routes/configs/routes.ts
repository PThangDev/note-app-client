import authRoutes from './authRoutes';
import privateRoutes from './privateRoutes';
import publicRoutes from './publicRoutes';

const routes = [...publicRoutes, ...authRoutes, ...privateRoutes];

export default routes;
