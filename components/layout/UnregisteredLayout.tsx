import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

interface UnregisteredLayoutProps {
  children: JSX.Element | JSX.Element[];
  title  ?: string;
};

const UnregisteredLayout = ({ children, title }: UnregisteredLayoutProps) => {
  return (
    <Provider store={store} >
      <Head>
        <title>{ title }</title>
      </Head>
      <main className='full-height container container-xl d-flex align-items-center justify-content-center'>
        { children }
      </main>
    </Provider>
  )
}

export default UnregisteredLayout
