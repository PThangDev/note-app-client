import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './ErrorBoundaryPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ErrorBoundaryPage: FC<Props> = (props) => {
  return <div className={cx('wrapper')}>ErrorBoundaryPage</div>;
};

export default ErrorBoundaryPage;
