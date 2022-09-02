import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head'

import { NextPageWithLayout } from './_app';
import TodoCard               from '../components/cards/TodoCard';
import MainLayout             from '../components/layout/MainLayout';

import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks';
import getTodosThunk from '../redux/slices/getTodosThunk';
import { ITodo }     from '../interfaces/Todos/ITodo';
import LoadingScreen from '../components/loading/LoadingScreen';

const Home: NextPageWithLayout = () => {

  const dispatch = useAppDispatch();
  const { isLoading, todos } = useAppSelector((state) => state.todos);

  useEffect(() => {

    dispatch( getTodosThunk() );
    
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Next JS - TodoAPP</title>
      </Head>
      <section>
        <div className='row justify-content-around'>

        { isLoading && <LoadingScreen /> }
        
        {
          todos.map(todo => (
            <TodoCard key={todo._id} cardsInfo={todo} />
          ))
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
