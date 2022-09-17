import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './ForgotPassword.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ForgotPassword: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>ForgotPassword</div>;
};

export default ForgotPassword;
