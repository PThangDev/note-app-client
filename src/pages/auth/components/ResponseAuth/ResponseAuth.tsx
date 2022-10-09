import { faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { FC } from 'react';

import { routePaths } from 'src/configs';
import { Button, Link } from 'src/themes/UI';
import { Spin } from 'src/themes/UI/Loading';
import styles from './ResponseAuth.module.scss';

interface Props {
  heading?: string;
  description?: string;
  success?: boolean;
  isLoading?: boolean;
}

const cx = classNames.bind(styles);

const ResponseAuth: FC<Props> = ({
  heading = '',
  description = 'Success. Please check your email to verify',
  success = true,
  isLoading = false,
}) => {
  const renderIcon = () => {
    if (isLoading) {
      return <Spin fontSize={80} />;
    }

    if (success) return <FontAwesomeIcon className={cx('icon-success')} icon={faCircleCheck} />;
    else return <FontAwesomeIcon className={cx('icon-error')} icon={faTriangleExclamation} />;
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading')}>{heading}</h2>
      <p className={cx('icon')}>{renderIcon()}</p>
      <p className={cx('description')}>{isLoading ? 'Wait a minutes...' : description}</p>
      <Button className={cx('btn-back')} disabled={isLoading}>
        <Link disabled={isLoading} to={routePaths.login}>
          Back to Login
        </Link>
      </Button>
    </div>
  );
};
export default ResponseAuth;
