import * as yup from 'yup';

export const usernameSchema = (fieldName: string = 'Username') => {
  return yup
    .string()
    .trim()
    .required('Username is required')
    .min(6, 'Username must have at least 6 characters')
    .max(30, 'Username must be at most 30 characters')
    .matches(
      /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/g,
      'Username cannot contain special characters!'
    );
};

export const emailSchema = (fieldName: string = 'Email') => {
  return yup.string().required(`${fieldName} is required`).email(`${fieldName} is not valid`);
};

export const passwordSchema = (fieldName = 'Password') => {
  return yup
    .string()
    .required('Password is required')
    .min(6, 'Password must have at least 6 characters')
    .max(15, 'Username must be at most 15 characters');
};

export const confirmPasswordSchema = (
  fieldName: string = 'Confirm Password',
  fieldRef: string = 'password'
) => {
  return yup
    .string()
    .required(`${fieldName} is required`)
    .oneOf([yup.ref(fieldRef), null], `${fieldName} does not match`);
};

export const accountSchema = (fieldName: string = 'Account') => {
  return yup
    .string()
    .required(`${fieldName} is required`)
    .matches(
      /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
      `Invalid. ${fieldName} must be an your Email or Username`
    );
};
