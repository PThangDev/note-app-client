import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './LoginPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const LoginPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>LoginPage</div>;
};

export default LoginPage;
