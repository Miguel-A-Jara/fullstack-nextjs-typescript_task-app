import { ReactElement, useEffect } from 'react';
import Head from 'next/head'

import { NextPageWithLayout } from './_app';
import TodoCard               from '../components/cards/TodoCard';
import MainLayout             from '../components/layout/MainLayout';

import getTodosThunk from '../redux/slices/getTodosThunk';
import EmptyCardList from '../components/cards/EmptyCardList';
import LoadingScreen from '../components/loading/LoadingScreen';
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';

const Home: NextPageWithLayout = () => {

  const dispatch = useAppDispatch();
  const { isLoading, todos } = useAppSelector((state) => state.todos);

  useEffect(() => {

    if ( todos.length < 1 ) dispatch( getTodosThunk() ); 
    //We only fetch the todos when the array of todos is empty.
    
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
