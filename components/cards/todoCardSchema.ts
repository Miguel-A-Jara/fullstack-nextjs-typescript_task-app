import * as yup from 'yup';

const todoCardSchema = () => {
  const schema = yup.object({
    author: yup
      .string()
      .typeError('The author must be a string')
      .min(3, 'The minimun length must be 3')
      .max(10, 'The maximun length must be 10'),

    title: yup
      .string()
      .typeError('The title must be a string')
      .min(5, 'The minimun length must be 5')
      .max(50, 'The maximun length must be 50'),

    description: yup
      .string()
      .typeError('The description must be a string')
      .min(10, 'Description is too short! (10 characters)')
      .max(100, 'Description is too long! (100 characters)'),

    priority: yup
      .number()
      .typeError('The priority must be a number')
      .min(1, 'Priority must be a number from 1 to 5')
      .max(5, 'Priority must be a number from 1 to 5'),
  });

  return schema;
};

export default todoCardSchema;
