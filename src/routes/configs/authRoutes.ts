import { lazy } from 'react';
import { routePaths } from 'src/configs';
import AuthLayout from 'src/layouts/AuthLayout';
import { AuthRouter } from '../components/OuterRoute';

const LoginPage = lazy(() => import('src/pages/auth/login'));
const RegisterPage = lazy(() => import('src/pages/auth/register'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));
const ActiveAccountPage = lazy(() => import('src/pages/auth/active-account'));
const ResetPasswordPage = lazy(() => import('src/pages/auth/reset-password'));

const authRoutes = [
  {
    path: routePaths.login,
    component: LoginPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.register,
    component: RegisterPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.forgotPassword,
    component: ForgotPasswordPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.activeAccount,
    component: ActiveAccountPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.changePassword,
    component: ResetPasswordPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
];

export default authRoutes;
