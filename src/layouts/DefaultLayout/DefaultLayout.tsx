import classNames from 'classnames/bind';
import { FC, ReactNode } from 'react';

import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';

interface Props {
  children: ReactNode;
}
const cx = classNames.bind(styles);
const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      {/* <Header /> */}
      <div className={cx('inner')}>
        <Sidebar />
        <main className={cx('main')}>{children}</main>
      </div>
      {/* <Menubar /> */}
    </div>
  );
};
export default DefaultLayout;
