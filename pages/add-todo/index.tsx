import { ReactElement } from "react"
import Form from "../../components/form/Form"
import MainLayout       from "../../components/layout/MainLayout"

import { NextPageWithLayout } from "../_app"

const index: NextPageWithLayout = () => {
  return (
    <div>
      <h1 className='text-center'>Add Todo</h1>
      <Form />
    </div>
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
