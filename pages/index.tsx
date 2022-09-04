import { ReactElement, useEffect } from 'react';
import Head from 'next/head'

import { NextPageWithLayout } from './_app';
import TodoCard               from '../components/cards/TodoCard';
import MainLayout             from '../components/layout/MainLayout';

import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import getTodosThunk from '../redux/slices/getTodosThunk';
import LoadingScreen from '../components/loading/LoadingScreen';
import EmptyCardList from '../components/cards/EmptyCardList';

const Home: NextPageWithLayout = () => {

  const dispatch = useAppDispatch();
  const { isLoading, todos } = useAppSelector((state) => state.todos);

  useEffect(() => {

    if ( todos.length < 1 )
      dispatch( getTodosThunk() );
    
  }, [dispatch]);

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
