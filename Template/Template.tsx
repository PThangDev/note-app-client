import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './Template.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const Template: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>Template</div>;
};

export default Template;
