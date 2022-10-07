import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/app/hooks';
import { routePaths } from 'src/configs';
import { Button, Input } from 'src/themes/UI';
import { UserForgotPassword } from 'src/types';
import { fetchForgotPassword } from '../authActions';

import styles from './ForgotPassword.module.scss';
import forgotPasswordSchema from './forgotPasswordSchema';

interface Props {}

const cx = classnames.bind(styles);

const ForgotPassword: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async ({ email }: UserForgotPassword) => {
    try {
      const response = await dispatch(fetchForgotPassword({ email })).unwrap();
      // If success. Redirect to login page
      navigate(routePaths.login);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h2>Forgot Password</h2>
        </div>
        <form className={cx('form')} action="" onSubmit={handleSubmit(handleForgotPassword)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              const { name } = field;
              return (
                <Input
                  id={name}
                  {...field}
                  placeholder="Enter your email..."
                  icon={<FontAwesomeIcon icon={faEnvelope} />}
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message}
                  disabled={isSubmitting}
                />
              );
            }}
          />
          <Button className={cx('btn-submit')} type="submit" fullWidth isLoading={isSubmitting}>
            Reset Password
          </Button>
        </form>
        <div className={cx('helper')}>
          Already have login and password? <Link to={routePaths.login}>Login</Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
