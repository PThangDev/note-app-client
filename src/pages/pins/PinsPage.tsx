import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './PinsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const PinsPage: FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>Pins</title>
      </Helmet>
      <div className={cx('wrapper')}>PinsPage</div>
    </>
  );
};

export default PinsPage;
