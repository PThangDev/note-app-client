import classNames from 'classnames/bind';
import { FC, ReactNode } from 'react';

import styles from './AuthLayout.module.scss';

interface Props {
  children: ReactNode;
}

const cx = classNames.bind(styles);
const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>{children}</div>
    </div>
  );
};
export default AuthLayout;
