import { ReactElement, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { NextPageWithLayout } from '../_app'
import UnregisteredLayout from '../../components/layout/UnregisteredLayout';

import styles from '../../styles/Unregistered/unregistered.module.css';
import UnregisteredFields from '../../interfaces/Unregistered/UnregisteredFields';

import FormTextInput      from '../../components/form/FormTextInput';
import FormSubmitButton   from '../../components/form/FormSubmitButton';
import LoadingCircle      from '../../components/loading/LoadingCircle';
import unregisteredSchema from '../../components/unregistered/unregisteredSchema';
import unregisteredSubmit from '../../utils/unregisteredSubmit';
import Link from 'next/link';

const schema = unregisteredSchema('login');

const Unregistered: NextPageWithLayout = () => {

  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm<UnregisteredFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  return (
    <form
      className={`${styles['login-form']} row p-2 py-4 p-lg-5 rounded-lg justify-content-center`}
      onSubmit={handleSubmit((data) =>
        unregisteredSubmit(data, setIsSubmiting, router, setError)
      )}
    >
      <h1 className='text-center fw-bold my-3 display-3 text-secondary'>
        Login
      </h1>

      <FormTextInput
        type='text'
        text='Email'
        icon='bi-envelope'
        errors={errors.email}
        register={register('email')}
      />

      <FormTextInput
        type='password'
        text='Password'
        icon='bi-asterisk'
        errors={errors.password}
        register={register('password')}
      />

      <div className='col-12 d-flex flex-lg-row align-items-end gap-3 mt-3 justify-content-between px-4'>
        
        <Link href='signup'>
          <a className='text-secondary fw-bold fs-4'>SignUp</a>
        </Link>
        
        {isSubmiting && <LoadingCircle size={40} />}

        {/* Returns true if the form is valid and is not submitting */}
        <FormSubmitButton text='Login' isValid={isValid} />
      </div>

    </form>
  );
}

Unregistered.getLayout = function(page: ReactElement) {
  return (
    <UnregisteredLayout title='Login' >
      { page }
    </UnregisteredLayout>
  )
};

export default Unregistered;
