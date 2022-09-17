import { lazy } from 'react';

import { routePaths } from 'src/configs';
import AuthLayout from 'src/layouts/AuthLayout';
import { AuthRouter } from '../components/OuterRoute';

const LoginPage = lazy(() => import('src/pages/auth/login'));
const RegisterPage = lazy(() => import('src/pages/auth/register'));
const ForgotPassword = lazy(() => import('src/pages/auth/forgot-password'));
const ActiveAccount = lazy(() => import('src/pages/auth/active-account'));

const authRoutes = [
  {
    path: routePaths.auth.login,
    component: LoginPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.auth.register,
    component: RegisterPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.auth.forgotPassword,
    component: ForgotPassword,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.auth.activeAccount,
    component: ActiveAccount,
    layout: AuthLayout,
    outer: AuthRouter,
  },
];

export default authRoutes;
