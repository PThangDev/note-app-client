import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, InputHTMLAttributes } from 'react';

import styles from './Switch.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  id?: string;
}

const cx = classnames.bind(styles);

const Switch: FC<Props> = ({ name, id = name, ...inputProps }) => {
  return (
    <div className={cx('wrapper')}>
      <input className={cx('checkbox')} type="checkbox" name={name} id={id} {...inputProps} />
      <label className={cx('label')} htmlFor={id}>
        <FontAwesomeIcon className={cx('icon')} icon={faMoon} />
        <FontAwesomeIcon className={cx('icon')} icon={faSun} />
        <div className={cx('ball')}></div>
      </label>
    </div>
  );
};

export default Switch;
