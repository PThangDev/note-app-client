import { FC, ReactNode } from 'react';
import classnames from 'classnames/bind';

import styles from './EmptyLayout.module.scss';

interface Props {
  children: ReactNode;
}

const cx = classnames.bind(styles);

const EmptyLayout: FC<Props> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>;
};

export default EmptyLayout;
