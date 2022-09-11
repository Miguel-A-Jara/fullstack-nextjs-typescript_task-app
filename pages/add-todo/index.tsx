import { ReactElement } from 'react'
import Head from 'next/head'

import Form from '../../components/form/Form'
import MainLayout       from '../../components/layout/MainLayout'

import { NextPageWithLayout } from '../_app'

const index: NextPageWithLayout = () => {
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

index.getLayout = function (page: ReactElement) {
  return (
    <MainLayout>
      { page }
    </MainLayout>
  )
}
export default index
