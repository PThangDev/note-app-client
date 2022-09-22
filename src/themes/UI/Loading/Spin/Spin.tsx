import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { CSSProperties, FC } from 'react';

import styles from './Spin.module.scss';

interface Props {
  style?: CSSProperties;
}

const cx = classNames.bind(styles);

const Spin: FC<Props> = ({ style }) => {
  return <FontAwesomeIcon style={style} className={cx('icon')} icon={faArrowsSpin} />;
};
export default Spin;
