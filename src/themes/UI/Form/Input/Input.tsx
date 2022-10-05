import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
  error?: boolean;
  helperText?: string;
}

const cx = classNames.bind(styles);

const Input = (
  {
    id = '',
    type = 'text',
    icon: Icon,
    error = false,
    helperText = '',
    className = '',
    disabled = false,
    ...inputProps
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isShowValue, setIsShowValue] = useState<boolean>(false);
  useEffect(() => {
    if (type === 'password') {
      setIsShowValue(false);
    }
  }, [type]);

  return (
    <div className={cx('input-group', { error, disabled }, className)}>
      <div className={cx('input-field', { 'without-icon': !Boolean(Icon) })}>
        <input
          id={id}
          type={isShowValue ? (type === 'password' ? 'text' : 'password') : type}
          disabled={disabled}
          {...inputProps}
          ref={ref}
        />
        <label htmlFor={id} className={cx('icon')}>
          {Icon ? Icon : ''}
        </label>
        {type === 'password' && (
          <span className={cx('eye')} onClick={() => setIsShowValue(!isShowValue)}>
            {!isShowValue ? (
              <FontAwesomeIcon icon={faEyeLowVision} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        )}
      </div>

      {helperText && <p className={cx('helper-text')}>(*) {helperText}</p>}
    </div>
  );
};
export default forwardRef(Input);
