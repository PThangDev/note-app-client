import { routePaths } from 'src/configs';
import AuthLayout from 'src/layouts/AuthLayout';
import { AuthRouter } from '../components/OuterRoute';

import ActiveAccount from 'src/pages/auth/active-account';
import ForgotPassword from 'src/pages/auth/forgot-password';
import LoginPage from 'src/pages/auth/login';
import RegisterPage from 'src/pages/auth/register';

const authRoutes = [
  {
    path: routePaths.auth.login.path,
    component: LoginPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.auth.register.path,
    component: RegisterPage,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.auth.forgotPassword.path,
    component: ForgotPassword,
    layout: AuthLayout,
    outer: AuthRouter,
  },
  {
    path: routePaths.auth.activeAccount.path,
    component: ActiveAccount,
    layout: AuthLayout,
    outer: AuthRouter,
  },
];

export default authRoutes;
