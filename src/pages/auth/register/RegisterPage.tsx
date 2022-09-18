import { faEnvelope, faLock, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames/bind';
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAppDispatch } from 'src/app/hooks';
import { routePaths } from 'src/configs';
import { Button, Checkbox, Input, Link } from 'src/themes/UI';
import { UserRegister } from 'src/types';
import { fetchRegister } from '../authActions';
import SocialAuth from '../components/SocialAuth';
import SuccessAuth from '../components/SuccessAuth';
import styles from './RegisterPage.module.scss';
import registerSchema from './registerSchema';

interface Props {}

const cx = classnames.bind(styles);

const RegisterPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      cf_password: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async ({
    username,
    email,
    password,
  }: UserRegister & { cf_password: string }) => {
    try {
      const response = await dispatch(fetchRegister({ username, email, password })).unwrap();
      toast.success(response.message);
      setIsRegisterSuccess(true);
    } catch (error: any) {
      setIsRegisterSuccess(false);
      toast.error(error.message, { autoClose: 4000 });
    }
  };

  const renderUIRegister = () => {
    if (!isRegisterSuccess) {
      return (
        <>
          <h1 className={cx('heading')}>Register</h1>
          <form className={cx('form')} action="" onSubmit={handleSubmit(handleRegister)}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                const { name } = field;
                return (
                  <Input
                    id={name}
                    {...field}
                    placeholder="Your username..."
                    icon={<FontAwesomeIcon icon={faUser} />}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                    disabled={isSubmitting}
                  />
                );
              }}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                const { name } = field;
                return (
                  <Input
                    id={name}
                    {...field}
                    placeholder="Your email..."
                    icon={<FontAwesomeIcon icon={faEnvelope} />}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
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
                    type="password"
                    placeholder="Your password..."
                    icon={<FontAwesomeIcon icon={faLock} />}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                    disabled={isSubmitting}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              name="cf_password"
              control={control}
              render={({ field }) => {
                const { name } = field;
                return (
                  <Input
                    id={name}
                    type="password"
                    placeholder="Your confirm password..."
                    icon={<FontAwesomeIcon icon={faLock} />}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                    disabled={isSubmitting}
                    {...field}
                  />
                );
              }}
            />
            <Checkbox className={cx('policy')} name="policy" label="I agree policy" />
            <Button
              className={cx('btn-submit')}
              type="submit"
              fullWidth
              icon={<FontAwesomeIcon icon={faUserPlus} />}
              isLoading={isSubmitting}
            >
              Register
            </Button>
            <SocialAuth disabled={isSubmitting} />
            <div className={cx('note')}>
              Already have an account?
              <Link to={routePaths.auth.login} disabled={isSubmitting}>
                Login
              </Link>
            </div>
          </form>
        </>
      );
    } else {
      return <SuccessAuth heading="Register" />;
    }
  };

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Home page note app - PThangDev"></meta>
      </Helmet>
      {/* Body */}
      <div className={cx('wrapper')}>{renderUIRegister()}</div>
    </>
  );
};

export default RegisterPage;
