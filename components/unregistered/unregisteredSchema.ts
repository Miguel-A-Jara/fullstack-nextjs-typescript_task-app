import * as yup from 'yup';

const unregisteredSchema = () => {

  const schema = yup.object({
    email: yup
      .string().typeError('Email must be a string')
      .email('Address must be a valid email')
      .min(5, 'The email must be at least 5 characters long')
      .max(50, 'Address must be a valid email'),

    password: yup
      .string().typeError('Type in a valid password')
      .min(5, 'The password must be at least 5 characters long')
      .max(20, 'The password must be less than 20 characters long')
  });

  return schema;
};

export default unregisteredSchema;