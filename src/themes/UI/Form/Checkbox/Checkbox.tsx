import classNames from 'classnames/bind';
import { ChangeEvent, CSSProperties, FC } from 'react';

import styles from './Checkbox.module.scss';

interface Props {
  name?: string;
  id?: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
