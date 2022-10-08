import * as yup from 'yup';

import {
  confirmPasswordSchema,
  emailSchema,
  passwordSchema,
  usernameSchema,
} from 'src/utils/schema';

const registerSchema = yup.object().shape({
  username: usernameSchema(),
  email: emailSchema(),
  password: passwordSchema(),
  cf_password: confirmPasswordSchema('Confirm Password', 'password'),
});

export default registerSchema;
