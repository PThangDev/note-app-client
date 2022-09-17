import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './ActiveAccountPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ActiveAccountPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>ActiveAccountPage</div>;
};

export default ActiveAccountPage;
