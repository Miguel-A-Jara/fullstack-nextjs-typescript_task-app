import { ReactElement, useEffect } from 'react'
import Head from 'next/head'

import useAuth from '../../hooks/useAuth'
import Form                   from '../../components/form/Form'
import MainLayout             from '../../components/layout/MainLayout'
import { NextPageWithLayout } from '../_app'
import { useRouter } from 'next/router'


const AddTodo: NextPageWithLayout = () => {

  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    
    if(!isAuthenticated) {
      router.push('/login');
    }

  }, [router]);

  return (
    <>
    <Head>
      <title>Task Manager - Add Task</title>
    </Head>
      <div className='py-lg-5'>
        <Form />
      </div>
    </>
  )
}

AddTodo.getLayout = function (page: ReactElement) {
  return (
    <MainLayout>
      { page }
    </MainLayout>
  )
}
export default AddTodo
