import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { CSSProperties, FC } from 'react';

import styles from './Spin.module.scss';

interface Props {
  style?: CSSProperties;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Spin: FC<Props> = ({ style, onClick }) => {
  return (
    <FontAwesomeIcon style={style} className={cx('icon')} icon={faArrowsSpin} onClick={onClick} />
  );
};
export default Spin;
