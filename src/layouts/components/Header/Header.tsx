import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classnames.bind(styles);

interface Props {}

const Header: FC<Props> = (props) => {
  return <header className={cx('wrapper')}>Header</header>;
};

export default Header;
