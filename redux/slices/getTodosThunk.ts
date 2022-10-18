import { Dispatch } from '@reduxjs/toolkit';

import { ITodo } from './../../interfaces/Todos/ITodo';
import fetchTodos from '../../utils/fetch-data/fetchTodos';
import { startLoadingTodos, setTodos } from '../slices/todoSlice';
import { useAppSelector } from '../../utils/hooks/reduxHooks';


const getTodosThunk = (token: string) => {

  return async ( dispatch: Dispatch  ) => {
    
    dispatch(startLoadingTodos());
    
    if ( !token ) return;

    const getTodosURL = 'todos/';
    const todos = await fetchTodos<ITodo[]>(getTodosURL, token);

    dispatch(setTodos(todos));
  };
};

export default getTodosThunk;