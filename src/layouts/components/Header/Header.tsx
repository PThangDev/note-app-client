import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'src/app/hooks';
import images from 'src/assets/images';
import Switch from 'src/components/Form/Switch';
import { NoteIcon } from 'src/components/Icons';
import { routePaths } from 'src/configs';
import styles from './Header.module.scss';
import Search from './Search';

interface Props {
  onToggleSidebar: () => void;
}

const cx = classNames.bind(styles);

const Header: FC<Props> = ({ onToggleSidebar }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('left')}>
          <a href={routePaths.home} className={cx('logo')}>
            <NoteIcon width={28} height={28} className={cx('note-icon')} />
            <p>NOTE APP</p>
          </a>
          {/* Search */}
          <Search />
        </div>
        <div className={cx('right')}>
          <div className={cx('dark-mode')}>
            <Switch name="dark-mode" />
          </div>
          <Link to={routePaths.profile} className={cx('user')}>
            <img className={cx('avatar')} src={user?.avatar || images.avatarDefault} alt="" />
            <p className={cx('username')}>{user?.username}</p>
          </Link>
          <FontAwesomeIcon className={cx('menu-bars')} icon={faBars} onClick={onToggleSidebar} />
        </div>
      </div>
    </header>
  );
};
export default Header;
