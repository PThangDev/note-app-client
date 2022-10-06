import * as yup from 'yup';
const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
});

export default forgotPasswordSchema;
