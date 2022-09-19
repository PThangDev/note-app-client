import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './HomePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const HomePage: FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Note App - PThangDev"></meta>
      </Helmet>
      <div className={cx('wrapper')}></div>
    </>
  );
};

export default HomePage;
