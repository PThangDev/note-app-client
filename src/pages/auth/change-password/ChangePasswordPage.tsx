import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input } from 'src/themes/UI';
import { UserChangePasswordForgot } from 'src/types';
import { confirmPasswordSchema, passwordSchema } from 'src/utils/schema';
import styles from './ChangePasswordPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ChangePasswordPage: FC<Props> = (props) => {
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

  const handleChangePassword = async (data: UserChangePasswordForgot) => {};

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <h2>Change Password</h2>
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

          <Button className={cx('btn-submit')} type="submit" fullWidth>
            Confirm
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPage;
