import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './PinsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const PinsPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>PinsPage</div>;
};

export default PinsPage;
