import { faEnvelope, faLock, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch } from 'src/app/hooks';
import { routePaths } from 'src/configs';
import { Button, Checkbox, Input, Link } from 'src/themes/UI';
import { UserLogin } from 'src/types';
import { fetchLogin } from '../authActions';
import SocialAuth from '../components/SocialAuth';
import styles from './LoginPage.module.scss';
import loginSchema from './loginSchema';

interface Props {}

const cx = classnames.bind(styles);

const LoginPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      account: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: UserLogin) => {
    await dispatch(fetchLogin(data)).unwrap();
  };

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Note App - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>
        <h1 className={cx('heading')}>Login</h1>
        <form className={cx('form')} action="" onSubmit={handleSubmit(handleLogin)}>
          <Controller
            name="account"
            control={control}
            render={({ field }) => {
              const { name } = field;
              return (
                <Input
                  id={name}
                  {...field}
                  placeholder="Your account..."
                  icon={<FontAwesomeIcon icon={faEnvelope} />}
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message || ''}
                  disabled={isSubmitting}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              const { name } = field;
              return (
                <Input
                  id={name}
                  {...field}
                  type="password"
                  placeholder="Your password..."
                  icon={<FontAwesomeIcon icon={faLock} />}
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message || ''}
                  disabled={isSubmitting}
                />
              );
            }}
          />

          <div className={cx('options')}>
            <Checkbox className={cx('checkbox')} label="Remember me" name="remember" />
            <Link to={routePaths.auth.forgotPassword} disabled={isSubmitting}>
              Forgot Password ?
            </Link>
          </div>

          <Button
            className={cx('btn-login')}
            type="submit"
            fullWidth
            icon={<FontAwesomeIcon icon={faRightToBracket} />}
            isLoading={isSubmitting}
          >
            Login
          </Button>
          <SocialAuth />
          <div className={cx('note')}>
            Don't have an account?
            <Link to={routePaths.auth.register} disabled={isSubmitting}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
