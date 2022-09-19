import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './ForgotPassword.module.scss';
import { Helmet } from 'react-helmet-async';

interface Props {}

const cx = classnames.bind(styles);

const ForgotPassword: FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      <div className={cx('wrapper')}>ForgotPassword</div>
    </>
  );
};

export default ForgotPassword;
