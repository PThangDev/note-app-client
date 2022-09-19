import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './TopicsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TopicsPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>TopicsPage</div>;
};

export default TopicsPage;
