// Import library
import classNames from 'classnames/bind';
import React, { FC, ReactNode } from 'react';
// Import src
import styles from './Container.module.scss';

interface Props {
  children: ReactNode;
}

const cx = classNames.bind(styles);

const Container: FC<Props> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>;
};
export default Container;
