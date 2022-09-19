import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './NotesPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>NotesPage</div>;
};

export default NotesPage;
