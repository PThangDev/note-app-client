import { FC } from 'react';
import classnames from 'classnames/bind';
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
      <div className={cx('wrapper')}>LoadingPage</div>
    </HelmetProvider>
  );
};

export default LoadingPage;
