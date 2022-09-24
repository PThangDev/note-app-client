import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './NotFoundPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NotFoundPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>404 - Not Found</div>;
};

export default NotFoundPage;
