import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './TopicBox.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TopicBox: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>TopicBox</div>;
};

export default TopicBox;
