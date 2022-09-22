import { faFan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { forwardRef, ReactElement, ReactNode } from 'react';

import styles from './Button.module.scss';

interface Props {
  children?: ReactNode;
  type?: string;
  primary?: boolean;
  icon?: ReactElement;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  status?: 'success' | 'info' | 'warning' | 'error';
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Button = (
  {
    children = '',
    primary = true,
    icon,
    fullWidth = false,
    disabled = false,
    isLoading = false,
    className = '',
    status = 'info',
    onClick,
  }: Props,
  ref: any
) => {
  return (
    <button
      className={cx(
        'button',
        {
          'button--primary': primary,
          'button--full-width': fullWidth,
          'button--disabled': disabled,
          'button--loading': isLoading,
          [`button--${status}`]: status,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      ref={ref}
    >
      {icon && !isLoading && <span className={cx('icon')}>{icon}</span>}
      {isLoading && (
        <span className={cx('icon-loading')}>
          <FontAwesomeIcon icon={faFan} />
        </span>
      )}
      {children && <p className={cx('text')}>{children}</p>}
    </button>
  );
};
export default forwardRef<HTMLButtonElement, Props>(Button);
