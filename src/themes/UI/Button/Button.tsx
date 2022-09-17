import classNames from 'classnames/bind';
import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props {
  children?: ReactNode;
  type?: string;
  primary?: boolean;
  icon?: FC;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  status?: 'success' | 'info' | 'warning' | 'error';
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Button: FC<Props> = ({
  children = '',
  primary = true,
  icon: Icon,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  className = '',
  status = '',
  onClick,
}) => {
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
    >
      {Icon && !isLoading && (
        <span className={cx('icon')}>
          <Icon />
        </span>
      )}
      {isLoading && (
        <span className={cx('icon-loading')}>
          <i className="fa-solid fa-fan"></i>
        </span>
      )}
      {children && <p className={cx('text')}>{children}</p>}
    </button>
  );
};
export default Button;
