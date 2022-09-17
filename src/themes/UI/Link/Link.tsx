import classNames from 'classnames/bind';
import { FC, MouseEvent, ReactNode } from 'react';
import { Link as RRDLink } from 'react-router-dom';

import styles from './Link.module.scss';

interface Props {
  children: ReactNode;
  to: string;
  disabled?: boolean;
  className?: string;
}

const cx = classNames.bind(styles);

const Link: FC<Props> = ({ children, to, disabled = false, className = '' }) => {
  const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) e.preventDefault();
  };
  return (
    <RRDLink className={cx('wrapper', { disabled }, className)} to={to} onClick={handleClickLink}>
      {children}
    </RRDLink>
  );
};
export default Link;
