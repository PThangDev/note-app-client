import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './TrashsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>Trashs</title>
      </Helmet>
      <div className={cx('wrapper')}>TrashsPage</div>
    </>
  );
};

export default TrashsPage;
