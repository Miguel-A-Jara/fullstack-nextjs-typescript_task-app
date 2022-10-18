import { ReactElement, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { NextPageWithLayout } from '../_app'
import UnregisteredLayout from '../../components/layout/UnregisteredLayout';

import styles from '../../styles/Unregistered/unregistered.module.css';
import UnregisteredFields from '../../interfaces/Unregistered/UnregisteredFields';

import FormTextInput      from '../../components/form/FormTextInput';
import FormSubmitButton   from '../../components/form/FormSubmitButton';
import LoadingCircle      from '../../components/loading/LoadingCircle';
import unregisteredSchema from '../../components/unregistered/unregisteredSchema';

import useAuth from '../../hooks/useAuth';
import useRegister from '../../utils/hooks/useRegister';

const schema = unregisteredSchema('signup');

const Unregistered: NextPageWithLayout = () => {

  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm<UnregisteredFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { isLoading, setLoginData } = useRegister(setError, '/signup');
  
  const unregisteredSubmit = (data: UnregisteredFields) => {

    const parsedData: Partial<UnregisteredFields> = data;
    delete parsedData.repeatPassword;


    setLoginData((parsedData as UnregisteredFields)); //casting it to UnregisteredFields
  };

  useEffect(() => {
    if(isAuthenticated)
      router.push('/');
  }, []);

  return (
    <form
      className={`${styles['login-form']} row p-2 py-4 p-lg-5 rounded-lg justify-content-center`}
      onSubmit={handleSubmit((data) =>
        unregisteredSubmit(data)
      )}
    >
      <h1 className='text-center fw-bold my-3 display-3 text-secondary'>
        SignUp
      </h1>

      <FormTextInput
        type='text'
        text='Username'
        icon='bi-person'
        errors={errors.username}
        register={register('username')}
      />

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

      <FormTextInput
        type='password'
        text='Repeat Password'
        icon='bi-asterisk'
        errors={errors.repeatPassword}
        register={register('repeatPassword')}
      />

      <div className='col-12 d-flex flex-lg-row align-items-center align-items-lg-end gap-3 mt-3 justify-content-between px-4'>
        <Link href='login'>
          <a className='text-secondary fw-bold fs-4'>Login</a>
        </Link>

        { isLoading && <LoadingCircle size={40} /> }

        {/* Returns true if the form is valid and is not submitting */}
        <FormSubmitButton text='Create Account' isValid={isValid} />
      </div>
    </form>
  );
}

Unregistered.getLayout = function(page: ReactElement) {
  return (
    <UnregisteredLayout title='SignUp' >
      { page }
    </UnregisteredLayout>
  )
};

export default Unregistered;
