import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { FC } from 'react';

import styles from './SocialAuth.module.scss';

interface Props {
  disabled?: boolean;
}

const cx = classNames.bind(styles);

const SocialAuth: FC<Props> = ({ disabled = false }) => {
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <li className={cx('item')}>
          <span className={cx('icon', 'icon--google')}>
            <FontAwesomeIcon icon={faGoogle} />
          </span>
        </li>
        <li className={cx('item')}>
          <span className={cx('icon', 'icon--facebook')}>
            <FontAwesomeIcon icon={faFacebookSquare} />
          </span>
        </li>
      </ul>
    </div>
  );
};
export default SocialAuth;
