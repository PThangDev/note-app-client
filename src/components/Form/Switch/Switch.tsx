import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';

import styles from './Switch.module.scss';

interface Props {
  name?: string;
  id?: string;
}

const cx = classnames.bind(styles);

const Switch: FC<Props> = ({ name, id = name }) => {
  return (
    <div className={cx('wrapper')}>
      <input className={cx('checkbox')} type="checkbox" name={name} id={id} />
      <label className={cx('label')} htmlFor={id}>
        <FontAwesomeIcon className={cx('icon')} icon={faMoon} />
        <FontAwesomeIcon className={cx('icon')} icon={faSun} />
        <div className={cx('ball')}></div>
      </label>
    </div>
  );
};

export default Switch;
