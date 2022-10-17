import * as yup from 'yup';
import Lazy from 'yup/lib/Lazy';

const unregisteredSchema = (type: 'login' | 'signup') => {

  let schema: any;

  if ( type === 'login') {
    schema = yup.object({
      email: yup
        .string()
        .typeError('Email must be a string')
        .email('Address must be a valid email')
        .min(5, 'The email must be at least 5 characters long')
        .max(50, 'Address must be a valid email'),

      password: yup
        .string()
        .typeError('Type in a valid password')
        .min(5, 'The password must be at least 5 characters long')
        .max(20, 'The password must be less than 20 characters long'),
    });
  };

  if ( type === 'signup' ) {

    schema = yup.object({
      username: yup
        .string()
        .typeError('Username must have valid characters')
        .min(5, 'The username must be at least 5 characters long')
        .max(15, 'The username must be less than 15 characters long'),
  
      email: yup
        .string()
        .typeError('Email must be a string')
        .email('Address must be a valid email')
        .min(5, 'The email must be at least 5 characters long')
        .max(50, 'Address must be a valid email'),
  
      password: yup
        .string()
        .typeError('Type in a valid password')
        .min(5, 'The password must be at least 5 characters long')
        .max(20, 'The password must be less than 20 characters long'),
  
      repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Passwords must match'),
    });
  };


  return schema;
};

export default unregisteredSchema;
