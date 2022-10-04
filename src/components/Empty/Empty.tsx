import classnames from 'classnames/bind';
import { FC } from 'react';

import EmptyNoteIcon from 'src/components/Icons/EmptyNoteIcon';
import styles from './Empty.module.scss';

interface Props {
  title?: string;
}

const cx = classnames.bind(styles);

const Empty: FC<Props> = ({ title }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <EmptyNoteIcon className={cx('icon')} />
        {title && <p className={cx('title')}>{title}</p>}
      </div>
    </div>
  );
};

export default Empty;
