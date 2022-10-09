import { faHouse, faRotate, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

import images from 'src/assets/images';
import { Button } from 'src/themes/UI';
import styles from './ErrorBoundaryPage.module.scss';

const cx = classnames.bind(styles);

const ErrorBoundaryPage: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('main')}>
        <h2 className={cx('title')}>Something went wrong!</h2>
        <div className={cx('name')}>{error.name}</div>
        <div className={cx('message')}>{error.message}</div>
        <div className={cx('stack')}>{error?.stack}</div>
        <div className={cx('actions')}>
          <a className={cx('link')} href="/">
            <Button icon={<FontAwesomeIcon icon={faHouse} />} status="success">
              Back to home
            </Button>
          </a>
          <Button icon={<FontAwesomeIcon icon={faRotate} />} onClick={resetErrorBoundary}>
            Reload page
          </Button>
        </div>
      </div>
      <div className={cx('image')}>
        <img src={images.fixIssue} alt="fix-issue" />
        <p className={cx('helper')}>
          <FontAwesomeIcon className={cx('icon')} icon={faTriangleExclamation} />
          We are trying to fix it
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundaryPage;
