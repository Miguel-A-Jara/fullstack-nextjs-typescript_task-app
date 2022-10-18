import { ReactElement, useEffect } from 'react';
import Head from 'next/head'

import { NextPageWithLayout } from './_app';
import TodoCard               from '../components/cards/TodoCard';
import MainLayout             from '../components/layout/MainLayout';
import EmptyCardList          from '../components/cards/EmptyCardList';
import LoadingScreen          from '../components/loading/LoadingScreen';

import getTodosThunk from '../redux/slices/getTodosThunk';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Home: NextPageWithLayout = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  const token = useAppSelector((state) => state.auth.token);
  const { isLoading, todos } = useAppSelector((state) => state.todos);

  useEffect(() => {

    if (!isAuthenticated || !token) {
      router.push('/login');
      return;
    }

    //We only fetch the todos when the array of todos is empty.
    if ( todos.length < 1 ) dispatch( getTodosThunk(token) ); 
    
  }, []);

  return (
    <>
      <Head>
        <title>Task Manager - Main</title>
      </Head>
      <section>
        
        <div className='row justify-content-around'>

        { isLoading && <LoadingScreen /> }
        
        {
          todos.length > 0 
            ? todos.map(todo => (
                <TodoCard key={todo._id} cardsInfo={todo} />
              ))
            : <EmptyCardList />
        }
        </div>
      </section>
    </>
  )
}

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <MainLayout>
      { page }
    </MainLayout>
  )
}

export default Home;
