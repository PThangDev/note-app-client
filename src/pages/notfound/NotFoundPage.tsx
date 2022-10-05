import { faHouseUser, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import { routePaths } from 'src/configs';
import { Button } from 'src/themes/UI';
import styles from './NotFoundPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NotFoundPage: FC<Props> = (props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Helmet>
        <title>404 - Not Found</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <h2 className={cx('code')}>404</h2>
        <p className={cx('title')}>OPPS! PAGE NOT FOUND</p>
        <p className={cx('description')}>
          Sorry, the page you're looking for doesn't exist. If you think something is broken, report
          a problem.
        </p>
        <div className={cx('options')}>
          <Button
            status="success"
            icon={<FontAwesomeIcon icon={faLeftLong} />}
            onClick={handleGoBack}
          >
            Go back
          </Button>
          <Link className={cx('link')} to={routePaths.home}>
            <Button icon={<FontAwesomeIcon icon={faHouseUser} />}>Home Page</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
