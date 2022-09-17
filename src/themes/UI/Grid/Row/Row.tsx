// Import library
import classNames from 'classnames/bind';
import React, { FC, ReactNode } from 'react';
// Import src
import styles from './Row.module.scss';

interface Props {
  children: ReactNode;
}

const cx = classNames.bind(styles);

const Row: FC<Props> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>;
};
export default Row;
