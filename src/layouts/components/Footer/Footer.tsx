import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classnames.bind(styles);

interface Props {}

const Footer: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Footer</div>;
};

export default Footer;
