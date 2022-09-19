import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAppSelector } from 'src/app/hooks';
import styles from './ProfilePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ProfilePage: FC<Props> = (props) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <Helmet>
        <title>{user?.username ? `Profile - ${user.username}` : 'Profile'}</title>
      </Helmet>
      <div className={cx('wrapper')}>ProfilePage</div>
    </>
  );
};

export default ProfilePage;
