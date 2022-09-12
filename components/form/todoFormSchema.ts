import * as yup from 'yup';

const todoFormSchema = () => {
  const schema = yup.object({
    
    author: yup
      .string().typeError('The author must be a string')
      .min(3, 'The minimun length must be 3')
      .max(10, 'The maximun length must be 10'),

    title: yup
      .string().typeError('The title must be a string')
      .min(5, 'The minimun length must be 5')
      .max(50, 'The maximun length must be 50'),

    description: yup
      .string().typeError('The description must be a string')
      .min(10, 'Description is too short! (10 characters)')
      .max(100, 'Description is too long! (100 characters)'),

    priority: yup
      .number().typeError('The priority must be a number')
      .min(1, 'Priority must be a number from 1 to 5')
      .max(5, 'Priority must be a number from 1 to 5'),
      
    image: yup
      .mixed()
      .required('A file is required')
      .test('file', 'A file is required', (value) => { return value && value.length })
      .test('fileSize', 'The file is too large (20mb)', (value) => {
        return value && value.length > 0 && value[0].size < 20000000;
      })
  })

  return schema;
}

export default todoFormSchema;