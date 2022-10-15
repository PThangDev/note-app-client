import classNames from 'classnames/bind';
import { gapi } from 'gapi-script';
import { FC, useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { toast } from 'react-toastify';

import { useAppDispatch } from 'src/app/hooks';
import { fetchLoginByGoogle } from '../../authActions';
import styles from './SocialAuth.module.scss';

interface Props {
  disabled?: boolean;
}

const cx = classNames.bind(styles);

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const SocialAuth: FC<Props> = ({ disabled = false }) => {
  const dispatch = useAppDispatch();
  // gapi-script
  // Fix bug google authen: You have created a new client application that uses libraries for user authentication
  // or authorization that will soon be deprecated
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleLoginSuccess = async (
    response?: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const { tokenId } = response as GoogleLoginResponse;
    dispatch(fetchLoginByGoogle({ tokenId }));
  };
  const handleLoginFailure = (error: any) => {
    console.log(error);
    toast.error(error?.error);
  };
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <GoogleLogin
          className={cx('btn-google')}
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with google"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          disabled={disabled}
        />
      </ul>
    </div>
  );
};
export default SocialAuth;
