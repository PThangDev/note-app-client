import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { gapi } from 'gapi-script';
import { FC, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import authSlice from 'src/pages/auth/authSlice';
import routes from './routes';
import styles from './Sidebar.module.scss';

interface Props {
  isOpen: boolean;
  onCloseSidebar: () => void;
}

const cx = classNames.bind(styles);

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const Sidebar: FC<Props> = ({ isOpen = false, onCloseSidebar }) => {
  const dispatch = useAppDispatch();

  // gapi-script
  // Fix bug google authen: You have created a new client application that uses libraries for user authentication
  // or authorization that will soon be deprecated
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleLogout = () => {
    const { logout } = authSlice.actions;
    dispatch(logout());
  };

  const handleLogoutGoogleSuccess = () => {
    handleLogout();
  };
  return (
    <div className={cx('wrapper', { active: isOpen })}>
      <ul className={cx('list')}>
        {routes.map((route, index) => {
          const { icon, to, label, end = undefined } = route;
          return (
            <li className={cx('item')} key={`${to}-${index}`}>
              <NavLink
                className={({ isActive }) => cx('link', { active: isActive })}
                end={end}
                to={to}
                onClick={onCloseSidebar}
              >
                <span className={cx('icon')}>{icon}</span>
                <span className={cx('label')}>{label}</span>
              </NavLink>
            </li>
          );
        })}

        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          onLogoutSuccess={handleLogoutGoogleSuccess}
          render={(renderProps) => (
            <li
              className={cx('item', { disabled: renderProps.disabled })}
              onClick={renderProps.onClick}
            >
              <div className={cx('link')}>
                <span className={cx('icon')}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </span>
                <span className={cx('label')}>Logout</span>
              </div>
            </li>
          )}
        />
      </ul>
    </div>
  );
};
export default Sidebar;
