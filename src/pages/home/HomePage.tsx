import classnames from 'classnames/bind';
import { FC } from 'react';

import styles from './HomePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const HomePage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}></div>;
};

export default HomePage;
