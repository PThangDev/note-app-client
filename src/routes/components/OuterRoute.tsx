import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'src/app/hooks';
import { routePaths } from 'src/configs';

interface Props {
  children: JSX.Element;
}

export const AuthRouter: React.FC<Props> = ({ children }) => {
  const { isAuthenticate } = useAppSelector((state) => state.auth);

  if (isAuthenticate) {
    return <Navigate to={routePaths.home.path} />;
  }
  return children;
};

export const PrivateRouter: React.FC<Props> = ({ children }) => {
  const { isAuthenticate } = useAppSelector((state) => state.auth);

  if (!isAuthenticate) {
    return <Navigate to={routePaths.auth.login.path} />;
  }
  return children;
};
