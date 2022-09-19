import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './ProfilePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ProfilePage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>ProfilePage</div>;
};

export default ProfilePage;
