import { useState }  from 'react';
import { useRouter } from 'next/router';

import { useForm }     from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import IFormFields        from './IFormFields';
import todoFormSendData   from '../../utils/send-Data/todoFormSendData';
import styles             from '../../styles/Form/form.module.css';

import todoFormSchema     from './todoFormSchema';
import FormTextInput      from './FormTextInput';
import FormNumberInput    from './FormNumberInput';
import FormSubmitButton   from './FormSubmitButton';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { addTodo }        from '../../redux/slices/todoSlice';
import LoadingCircle from '../loading/LoadingCircle';
import FormImageInput from './FormImageInput';

const schema = todoFormSchema();

const Form = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm<IFormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitForm = async (data: IFormFields) => {
    
    try {

      setIsSubmitting(true);
      todoFormSendData(data).then((resp) => {
        if (resp._id) {
          //If we received an ID then it means the TODO was created

          const todo = resp;
          delete todo.__v; // We remove the MONGO id (__v) from the response

          dispatch(addTodo(todo));
          router.push(`/todo/${resp._id}`);
        }

        if (resp.statusCode === 400) {
          setError('title', { type: 'custom', message: resp.message });
          setIsSubmitting(false);
        }
      });

    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <form
      className={`${ styles.form } app-shadow p-3 p-lg-5 row rounded-lg justify-content-center justify-content-lg-start align-items-start`} 
      onSubmit={handleSubmit(submitForm)}
    >
      <FormTextInput
        text='Author'
        icon='bi-person-fill'
        errors={errors.author}
        register={register('author')}
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

      <FormImageInput 
        icon='' 
      />

      <div className='col-12 d-flex flex-lg-row align-items-center gap-3 justify-content-end pe-lg-5'>
        { isSubmitting &&  <LoadingCircle size={40} /> }

        {/* Returns true if the form is valid and is not submitting */}
        <FormSubmitButton isValid={ isValid && !isSubmitting} />
      </div>

    </form>
  )
}

export default Form;
