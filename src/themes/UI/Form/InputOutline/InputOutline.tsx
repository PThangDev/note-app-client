import { FC, InputHTMLAttributes, ReactElement } from 'react';
import classnames from 'classnames/bind';

import styles from './InputOutline.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
  label?: string;
}

const cx = classnames.bind(styles);

const InputOutline: FC<Props> = ({ icon, label, ...inputProps }) => {
  const { id } = inputProps;
  return (
    <div className={cx('wrapper')}>
      <label htmlFor={id}>{label}</label>
      <div className={cx('field')}>
        <input {...inputProps} />
      </div>
    </div>
  );
};

export default InputOutline;
