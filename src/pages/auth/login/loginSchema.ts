import * as yup from 'yup';

import { accountSchema, passwordSchema } from 'src/utils/schema';

const loginSchema = yup.object().shape({
  account: accountSchema(),
  password: passwordSchema(),
});

export default loginSchema;
