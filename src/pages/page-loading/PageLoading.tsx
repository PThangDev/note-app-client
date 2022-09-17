import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './PageLoading.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const PageLoading: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>PageLoading</div>;
};

export default PageLoading;
