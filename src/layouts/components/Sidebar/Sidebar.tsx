import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { FC } from 'react';
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

const Sidebar: FC<Props> = ({ isOpen = false, onCloseSidebar }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const { logout } = authSlice.actions;
    dispatch(logout());
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
        <li className={cx('item')} onClick={handleLogout}>
          <div className={cx('link')}>
            <span className={cx('icon')}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span className={cx('label')}>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
