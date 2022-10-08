import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { Button, Input } from 'src/themes/UI';
import styles from './ChangePasswordPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ChangePasswordPage: FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <h2>Change Password</h2>
        <form action="" className={cx('form')}>
          <Input icon={<FontAwesomeIcon icon={faLock} />} placeholder="New password" />
          <Input icon={<FontAwesomeIcon icon={faLock} />} placeholder="Confirm New Password" />
          <Button className={cx('btn-submit')} fullWidth>
            Confirm
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPage;
