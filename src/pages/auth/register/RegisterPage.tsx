import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './RegisterPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const RegisterPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>RegisterPage</div>;
};

export default RegisterPage;
