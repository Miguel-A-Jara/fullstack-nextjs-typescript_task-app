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
import LoadingCircle      from '../loading/LoadingCircle';
import FormImageInput     from './FormImageInput';
import { ITodo }          from '../../interfaces/Todos/ITodo';

export const schema = todoFormSchema();

const Form = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isValid }, setError, setValue, trigger } = useForm<IFormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const submitForm = async (data: IFormFields) => {

    try {

      setIsSubmitting(true);
      todoFormSendData(data).then((resp) => {
        const { respData, respImag } = resp;
        if ( respData._id && respImag.name ) {
          //If we received an ID and a name then it means the TODO was created
          
          const todo: ITodo = {...respData, ...respImag};

          dispatch(addTodo(todo));
          router.push(`/todo/${respData._id}`);
        }

        if (respData.statusCode === 400) {
          setError('title', { type: 'custom', message: respData.message });
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
        trigger={ trigger }
        watchValue={ watch }
        setValue={ setValue }
        errors={errors.image}
        register={register('image')}
      />

      <div className='col-12 d-flex flex-lg-row align-items-center gap-3 mt-3 justify-content-end pe-lg-5'>
        { isSubmitting &&  <LoadingCircle size={40} /> }

        {/* Returns true if the form is valid and is not submitting */}
        <FormSubmitButton isValid={ isValid  } />
      </div>

    </form>
  )
}

export default Form;
