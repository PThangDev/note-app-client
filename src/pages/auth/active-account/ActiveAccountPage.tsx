import classnames from 'classnames/bind';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import { fetchVerifyAccount } from '../authActions';
import ResponseAuth from '../components/ResponseAuth';
import styles from './ActiveAccountPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ActiveAccountPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { activeToken } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerifySuccess, setIsVerifySuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!activeToken) return;
    const verifyAccount = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(fetchVerifyAccount(activeToken)).unwrap();

        setIsVerifySuccess(true);
        setIsLoading(false);
        setMessage(response.message);
      } catch (error: any) {
        setIsLoading(false);
        setIsVerifySuccess(false);
        setMessage(error?.message || '');
      }
    };

    verifyAccount();
  }, [activeToken, dispatch]);

  return (
    <>
      <Helmet>
        <title>Active account</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <ResponseAuth
            heading="Active Account"
            description={message}
            isLoading={isLoading}
            success={isVerifySuccess}
          />
        </div>
      </div>
    </>
  );
};

export default ActiveAccountPage;
