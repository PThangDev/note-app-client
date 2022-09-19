import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './ActiveAccountPage.module.scss';
import { Helmet } from 'react-helmet-async';

interface Props {}

const cx = classnames.bind(styles);

const ActiveAccountPage: FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>Active account</title>
      </Helmet>
      <div className={cx('wrapper')}>ActiveAccountPage</div>
    </>
  );
};

export default ActiveAccountPage;
