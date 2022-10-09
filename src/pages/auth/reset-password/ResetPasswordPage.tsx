import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/app/hooks';
import { routePaths } from 'src/configs';
import { Button, Input, Link } from 'src/themes/UI';
import { UserResetPassword } from 'src/types';
import { confirmPasswordSchema, passwordSchema } from 'src/utils/schema';
import { fetchResetPassword } from '../authActions';
import styles from './ResetPasswordPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ResetPasswordPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resetPasswordToken } = useParams();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      cfNewPassword: '',
    },
    // Set rule validate form
    resolver: yupResolver(
      yup.object().shape({
        newPassword: passwordSchema('New Password'),
        cfNewPassword: confirmPasswordSchema('Confirm New Password', 'newPassword'),
      })
    ),
  });

  const handleChangePassword = async (data: UserResetPassword) => {
    try {
      if (!resetPasswordToken) return;
      const response = await dispatch(
        fetchResetPassword({ data, token: resetPasswordToken })
      ).unwrap();

      toast.success(response.message);

      navigate(routePaths.login);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <h2>Reset Password</h2>
        <form className={cx('form')} onSubmit={handleSubmit(handleChangePassword)}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => {
              const { name } = field;
              return (
                <Input
                  id={name}
                  {...field}
                  type="password"
                  icon={<FontAwesomeIcon icon={faLock} />}
                  placeholder="New password"
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message}
                  disabled={isSubmitting}
                />
              );
            }}
          />

          <Controller
            name="cfNewPassword"
            control={control}
            render={({ field }) => {
              const { name } = field;
              return (
                <Input
                  id={name}
                  {...field}
                  type="password"
                  icon={<FontAwesomeIcon icon={faLock} />}
                  placeholder="Confirm New Password"
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message}
                  disabled={isSubmitting}
                />
              );
            }}
          />

          <Button className={cx('btn-submit')} type="submit" fullWidth isLoading={isSubmitting}>
            Confirm
          </Button>
          <div className={cx('helper')}>
            Back to{' '}
            <Link to={routePaths.login} disabled={isSubmitting}>
              Login
            </Link>{' '}
            or <Link to={routePaths.register}>Register</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
