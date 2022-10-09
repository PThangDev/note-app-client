import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { CSSProperties, FC } from 'react';

import styles from './Spin.module.scss';

interface Props {
  style?: CSSProperties;
  onClick?: () => void;
  fontSize?: number;
}

const cx = classNames.bind(styles);

const Spin: FC<Props> = ({ style, fontSize = 25, onClick }) => {
  return (
    <FontAwesomeIcon
      style={{ fontSize, ...style }}
      className={cx('icon')}
      icon={faArrowsSpin}
      onClick={onClick}
    />
  );
};
export default Spin;
