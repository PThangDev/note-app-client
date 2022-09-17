// Import library
import classNames from 'classnames/bind';
import React, { FC, ReactNode } from 'react';
// Import src
import styles from './Col.module.scss';

interface Props {
  children: ReactNode;
  col?: { xs?: Number; sm?: Number; md?: Number; lg?: Number; xl?: Number };
}

const cx = classNames.bind(styles);

const Col: FC<Props> = ({ children, col }) => {
  return (
    <div
      className={cx('wrapper', {
        [`col-xs-${col?.xs}`]: col?.xs,
        [`col-sm-${col?.sm}`]: col?.sm,
        [`col-md-${col?.md}`]: col?.md,
        [`col-lg-${col?.lg}`]: col?.lg,
        [`col-xl-${col?.xl}`]: col?.xl,
      })}
    >
      {children}
    </div>
  );
};
export default Col;
