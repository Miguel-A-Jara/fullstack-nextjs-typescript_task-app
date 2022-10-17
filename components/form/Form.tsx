/* ===== React & Next Imports ===== */
import { useState }  from 'react';
import { useRouter } from 'next/router';


/* ===== Libraries Imports ===== */
import { useForm }     from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


/* ===== Interfaces Imports ===== */
import IFormFields        from './IFormFields';


/* ===== Utility Functions ===== */
import todoFormSchema     from './todoFormSchema';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import submitAddTodoForm  from '../../utils/submitAddTodoForm';


/* ===== Components Imports ===== */
import FormTextInput      from './FormTextInput';
import FormImageInput     from './FormImageInput';
import FormSubmitButton   from './FormSubmitButton';
import LoadingCircle      from '../loading/LoadingCircle';

import styles             from '../../styles/Form/form.module.css';

const schema = todoFormSchema();

const Form = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isValid }, setError, setValue, trigger } = useForm<IFormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  return (

    <form
      className={
        `${ styles.form } app-shadow p-3 p-lg-5 row rounded-lg justify-content-center justify-content-lg-start align-items-start`
      } 
      onSubmit={handleSubmit(data => submitAddTodoForm(data, setIsSubmitting, router, dispatch, setError))}
    >
      <FormTextInput
        text='Author'
        icon='bi-person-fill'
        errors={errors.author}
        register={register('author')}
      />
      <FormTextInput
        text='Title'
        icon='bi-textarea-t'
        errors={errors.title}
        register={register('title')}
      />
      <FormTextInput
        text='Description'
        errors={errors.description}
        icon='bi-file-earmark-text-fill'
        register={register('description')}
      />
      <FormTextInput
        type='number'
        text='Priority'
        icon='bi-alarm-fill'
        errors={errors.priority}
        register={register('priority')}
      />
      <FormImageInput 
        trigger ={trigger}
        watchValue={watch}
        setValue={setValue}
        errors={errors.image}
        register={register('image')}
      />

      <div className='col-12 d-flex flex-lg-row align-items-center gap-3 mt-3 justify-content-end pe-lg-5'>
        { isSubmitting &&  <LoadingCircle size={40} /> }

        <FormSubmitButton isValid={ isValid  } />
      </div>

    </form>
  )
}

export default Form;
