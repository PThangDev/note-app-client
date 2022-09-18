import * as yup from 'yup';
const registerSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Username is required')
    .min(6, 'Username must have at least 6 characters')
    .max(30, 'Username must be at most 30 characters')
    .matches(
      /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/g,
      'Username cannot contain special characters!'
    ),
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must have at least 6 characters')
    .max(15, 'Username must be at most 15 characters'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  //   'Password must have at least one uppercase letter, one lowercase letter one number and one special character!'
  // )
  cf_password: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Confirm password does not match'),
});

export default registerSchema;
