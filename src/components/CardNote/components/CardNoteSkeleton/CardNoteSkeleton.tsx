import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './CardNoteSkeleton.module.scss';
import { Spin } from 'src/themes/UI/Loading';

interface Props {}

const cx = classnames.bind(styles);

const CardNoteSkeleton: FC<Props> = (props) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <Spin style={{ fontSize: '50px', marginBottom: '10px' }} />
        Loading...
      </div>
    </div>
  );
};

export default CardNoteSkeleton;
