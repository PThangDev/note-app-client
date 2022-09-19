import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import authSlice from 'src/pages/auth/authSlice';
import routes from './routes';
import styles from './Sidebar.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Sidebar: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    const { logout } = authSlice.actions;
    dispatch(logout());
  };
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        {routes.map((route, index) => {
          const { icon, to, label } = route;
          return (
            <li className={cx('item')} key={`${to}-${index}`}>
              <NavLink className={({ isActive }) => cx('link', { active: isActive })} end to={to}>
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
