import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}
const IS_AUTHENTICATE = false;

export const AuthRouter: React.FC<Props> = ({ children }) => {
  if (IS_AUTHENTICATE) {
    return <Navigate to="/" />;
  }
  return children;
};

export const PrivateRouter: React.FC<Props> = ({ children }) => {
  if (!IS_AUTHENTICATE) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};
