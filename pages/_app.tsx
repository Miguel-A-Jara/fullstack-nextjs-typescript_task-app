import { ReactElement, ReactNode } from 'react'
import type { AppProps }  from 'next/app'
import { NextPage }       from 'next';
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page) => page);
  
  return getLayout (
    <Component {...pageProps} />
  )
}

export default MyApp;
