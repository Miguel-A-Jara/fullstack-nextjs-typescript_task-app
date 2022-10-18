import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { WritableDraft } from 'immer/dist/internal';
import updateTodoHelper  from '../helpers/todoSliceHelpers/updateTodo';
import { ITodo } from './../../interfaces/Todos/ITodo';

type FilterParamsType = { param: keyof ITodo, value: string | number | boolean };

export type InitStateType = {
  todos    : ITodo[] | [],
  todosCopy: ITodo[] | [],
  isLoading: boolean;
  filterParams: FilterParamsType[];
}

const initialState: InitStateType = {
  todos: [],
  todosCopy: [],
  isLoading: false,
  filterParams: [
    {
      param: 'author',
      value: 'All'
    },
    {
      param: 'completed',
      value: 'All'
    },
    {
      param: 'priority',
      value: 'All'
    },
  ],
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {

      state.todosCopy = [...state.todosCopy, action.payload];
      state.todos = state.todosCopy;

    },
    startLoadingTodos: (state) => {

      state.isLoading = true;

    },
    setTodos: (state, action: PayloadAction<ITodo[]>) => {

      state.isLoading = false;
      state.todos     = action.payload;
      state.todosCopy = action.payload;

    },
    updateTodo: (state, action: PayloadAction<{ _id: string, paramName: keyof ITodo, paramValue: unknown }>) => {

      const updatedTodo = updateTodoHelper( state, action );

      if ( !updatedTodo ) return state;

      state.todosCopy = state.todosCopy.map( todo => todo._id === updatedTodo._id ? updatedTodo : todo );
      state.todos     = state.todosCopy;

    },
    deleteTodo: (state, action: PayloadAction<string>) => {

      state.todos = state.todos.filter(todo => ( todo._id !== action.payload ));
      state.todosCopy = state.todos;

    },
    deleteAllTodos: (state) => {
      state.todos = [];
      state.todosCopy = [];
    },
    filterTodos: (state) => {

      const areFilterParams = state.filterParams.every(param => param.value === 'All');
      if ( areFilterParams ) {
        state.todos = state.todosCopy;
        return;
      }
      
      const filteredTodos = state.todosCopy.filter(todo => {

        let firstCondition:  boolean;
        let secondCondition: boolean;
        let thirdCondition:  boolean; 

        state.filterParams[0].value === 'All'
          ? firstCondition = true
          : firstCondition = todo.author === state.filterParams[0].value;
        
        state.filterParams[1].value === 'All'
          ? secondCondition = true
          : secondCondition = todo.completed === state.filterParams[1].value;
        
        state.filterParams[2].value === 'All'
          ? thirdCondition = true
          : thirdCondition = todo.priority === state.filterParams[2].value;
        

        if ( firstCondition && secondCondition && thirdCondition ) {
          return todo;
        };
      
        return null;

      });

      state.todos = filteredTodos as WritableDraft<ITodo>[];

    },
    updateFilterParams: (state, action: PayloadAction<FilterParamsType | null>) => {

      if ( !action.payload ) { //If we havent received a payload, then we clean the filters
        state.filterParams = state.filterParams.map(p => ({ ...p, value: 'All' }));
        return;
      }

      const assertedAction = action as PayloadAction<FilterParamsType>;

      state.filterParams = state.filterParams.map(p => (
        p.param === assertedAction.payload.param
          ? { ...p, value: assertedAction.payload.value }
          : ( p )
      ))
    },
  }
});

export const {
  addTodo,
  startLoadingTodos,
  setTodos,
  updateTodo,
  deleteTodo,
  filterTodos,
  deleteAllTodos,
  updateFilterParams
} = todoSlice.actions;
export default todoSlice.reducer;