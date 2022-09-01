import { Dispatch } from '@reduxjs/toolkit';

import { ITodo } from './../../interfaces/Todos/ITodo';
import fetchTodos from '../../utils/fetch-data/fetchTodos';
import { startLoadingTodos, setTodos } from '../slices/todoSlice';


const getTodosThunk = () => {
  return async ( dispatch: Dispatch  ) => {
    
    dispatch(startLoadingTodos());

    const getTodosURL = 'todos/';
    const todos = await fetchTodos<ITodo[]>(getTodosURL);

    dispatch(setTodos(todos));
  };
};

export default getTodosThunk;