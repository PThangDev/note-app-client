import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './TrashsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>TrashsPage</div>;
};

export default TrashsPage;
