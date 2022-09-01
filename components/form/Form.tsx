import { useRouter } from 'next/router';

import { useForm }     from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import IFormFields        from './IFormFields';
import todoFormSendData   from '../../utils/send-Data/todoFormSendData';

import todoFormSchema    from './todoFormSchema';
import FormTextInput     from './FormTextInput';
import FormNumberInput   from './FormNumberInput';
import FormSubmitButton  from './FormSubmitButton';

const schema = todoFormSchema();

const Form = () => {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm<IFormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitForm = (data: IFormFields) => {
    try {

      todoFormSendData(data)
        .then(data => {
          if (data._id) { //If we received an ID then it means the TODO was created
            router.push(`/todo/${data._id}`)
          }

          if (data.statusCode === 400) {
            setError('title', { type: 'custom', message: data.message })
          }
        })

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className='bg-secondary row rounded' onSubmit={handleSubmit(submitForm)}>
        <FormTextInput
          icon='bi-person-fill'
          text='Author'
          register={register('author')}
          errors={errors.author}
        />
        <FormTextInput
          icon='bi-textarea-t'
          text='Title'
          register={register('title')}
          errors={errors.title}
        />
        <FormTextInput
          icon='bi-file-earmark-text-fill'
          text='Description'
          register={register('description')}
          errors={errors.description}
        />
        <FormNumberInput
          icon='bi-alarm-fill'
          text='Priority'
          register={register('priority')}
          errors={errors.priority}
        />

      <FormSubmitButton isValid={ isValid } />
    </form>
  )
}

export default Form;
