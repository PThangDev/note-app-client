import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { gapi } from 'gapi-script';
import { FC, useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

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
  };
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with google"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          render={(renderProps) => (
            <li className={cx('item')}>
              <button
                className={cx('icon', 'icon--google')}
                type="button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FontAwesomeIcon icon={faGoogle} />
              </button>
            </li>
          )}
        />
        {/* <li className={cx('item')}>
          <span className={cx('icon', 'icon--google')}>
            <FontAwesomeIcon icon={faGoogle} />
          </span>
        </li>
        <li className={cx('item')}>
          <span className={cx('icon', 'icon--facebook')}>
            <FontAwesomeIcon icon={faFacebookSquare} />
          </span>
        </li> */}
      </ul>
    </div>
  );
};
export default SocialAuth;
