import { faFan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react';

import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  icon?: ReactElement;
  fullWidth?: boolean;
  isLoading?: boolean;
  status?: 'success' | 'info' | 'warning' | 'error';
}

const cx = classNames.bind(styles);

const Button = (
  {
    children = '',
    icon,
    type = 'button',
    primary = true,
    fullWidth = false,
    disabled = false,
    isLoading = false,
    className = '',
    status = 'info',
    ...buttonProps
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
          'button--loading': isLoading,
          [`button--${status}`]: status,
        },
        className
      )}
      type={type}
      disabled={disabled || isLoading}
      ref={ref}
      {...buttonProps}
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
