import classNames from 'classnames/bind';
import { CSSProperties, FC, InputHTMLAttributes } from 'react';

import styles from './Checkbox.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const cx = classNames.bind(styles);

const Checkbox: FC<Props> = ({
  id = '',
  name = '',
  label = '',
  className = '',
  style,
  checked,
  onChange = () => {},
}) => {
  return (
    <div className={cx('wrapper', className)} style={style}>
      <input
        type="checkbox"
        checked={checked ?? undefined}
        name={name}
        id={id || name}
        onChange={onChange}
      />
      {label && <label htmlFor={id || name}>{label}</label>}
    </div>
  );
};
export default Checkbox;
