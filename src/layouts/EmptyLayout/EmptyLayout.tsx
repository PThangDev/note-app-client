import { FC, ReactNode, Suspense } from 'react';
import classnames from 'classnames/bind';

import styles from './EmptyLayout.module.scss';

interface Props {
  children: ReactNode;
}

const cx = classnames.bind(styles);

const EmptyLayout: FC<Props> = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default EmptyLayout;
