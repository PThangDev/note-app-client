import { FC, InputHTMLAttributes, ReactElement } from 'react';
import classnames from 'classnames/bind';

import styles from './InputOutline.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
  label?: string;
  className?: string;
  margin?: 'dense' | 'normal' | 'none';
}

const cx = classnames.bind(styles);

const InputOutline: FC<Props> = ({ icon, margin = 'dense', label, className, ...inputProps }) => {
  const { id, readOnly } = inputProps;
  return (
    <div className={cx('wrapper', { 'read-only': readOnly }, `margin-${margin}`, className)}>
      <label htmlFor={id}>{label}</label>
      <div className={cx('field')}>
        {icon && <span className={cx('icon')}>{icon}</span>}
        <input {...inputProps} />
      </div>
    </div>
  );
};

export default InputOutline;
