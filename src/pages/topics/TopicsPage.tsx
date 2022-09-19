import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './TopicsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TopicsPage: FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>Topics</title>
      </Helmet>
      <div className={cx('wrapper')}>TopicsPage</div>
    </>
  );
};

export default TopicsPage;
