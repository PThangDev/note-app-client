import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'src/app/hooks';

interface Props {
  children: JSX.Element;
}

export const AuthRouter: React.FC<Props> = ({ children }) => {
  const { isAuthenticate } = useAppSelector((state) => state.auth);

  if (isAuthenticate) {
    return <Navigate to="/" />;
  }
  return children;
};

export const PrivateRouter: React.FC<Props> = ({ children }) => {
  const { isAuthenticate } = useAppSelector((state) => state.auth);

  if (!isAuthenticate) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};
