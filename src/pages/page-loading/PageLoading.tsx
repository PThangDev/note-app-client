import { FC } from 'react';
import classnames from 'classnames/bind';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import styles from './PageLoading.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const PageLoading: FC<Props> = (props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <div className={cx('wrapper')}>PageLoading</div>
    </HelmetProvider>
  );
};

export default PageLoading;
