import classNames from 'classnames/bind';
import { FC, ReactNode, Suspense, useState } from 'react';

import LoadingPage from 'src/pages/loading';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';

interface Props {
  children: ReactNode;
}
const cx = classNames.bind(styles);
const DefaultLayout: FC<Props> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setIsOpenSidebar((prevIsOpenSidebar) => !prevIsOpenSidebar);
  };
  const handleCloseSidebar = () => {
    if (isOpenSidebar) {
      setIsOpenSidebar(false);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className={cx('inner')}>
        <Sidebar isOpen={isOpenSidebar} onCloseSidebar={handleCloseSidebar} />

        <Suspense fallback={<LoadingPage />}>
          <main className={cx('main', { 'full-width': !isOpenSidebar })}>{children}</main>
        </Suspense>

        {isOpenSidebar && <div className={cx('overlay')} onClick={handleCloseSidebar}></div>}
      </div>
      {/* <Menubar /> */}
    </div>
  );
};
export default DefaultLayout;
