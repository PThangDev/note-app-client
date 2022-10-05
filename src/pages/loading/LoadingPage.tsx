import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import styles from './LoadingPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const LoadingPage: FC<Props> = (props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <div className={cx('wrapper')}></div>
    </HelmetProvider>
  );
};

export default LoadingPage;
