import * as yup from 'yup';

import { emailSchema } from 'src/utils/schema';

const forgotPasswordSchema = yup.object().shape({
  email: emailSchema(),
});

export default forgotPasswordSchema;
