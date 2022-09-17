import classNames from 'classnames/bind';
import { FC } from 'react';

import styles from './Spin.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Spin: FC<Props> = (props) => {
  return (
    <p className={cx('wrapper')}>
      {/* <i className="fa-solid fa-atom"></i> */}
      <i className="fa-solid fa-arrows-spin"></i>
    </p>
  );
};
export default Spin;
