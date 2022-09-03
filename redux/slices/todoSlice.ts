import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import updateTodoHelper from '../helpers/todoSliceHelpers/updateTodo';
import { ITodo } from './../../interfaces/Todos/ITodo';

export type InitStateType = {
  todos:  ITodo[] | [],
  todosCopy: ITodo[] | [],
  isLoading: boolean;
}

const initialState: InitStateType = {
  todos: [],
  todosCopy: [],
  isLoading: false
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {

      state.todos = [...state.todos, action.payload];
      state.todosCopy = state.todos;

    },
    startLoadingTodos: (state) => {

      state.isLoading = true;

    },
    setTodos: (state, action: PayloadAction<ITodo[]>) => {

      state.isLoading = false;
      state.todos = action.payload;
      state.todosCopy = action.payload;

    },
    updateTodo: (state, action: PayloadAction<{ _id: string, paramName: keyof ITodo, paramValue: unknown }>) => {

      const updatedTodo = updateTodoHelper( state, action );

      if ( !updatedTodo ) return state;

      state.todos = state.todos.map( todo => todo._id === updatedTodo._id ? updatedTodo : todo );
      state.todosCopy = state.todos;

    },
    deleteTodo: (state, action: PayloadAction<string>) => {

      state.todos = state.todos.filter(todo => ( todo._id !== action.payload ));
      state.todosCopy = state.todos;

    },
    filterTodos: (state, action: PayloadAction<{ field: keyof ITodo, value: string }>) => {

      if (action.payload.value === 'All') {
        state.todos = state.todosCopy;
        return;
      }
      
      state.todos = state.todosCopy.filter(todo => todo[action.payload.field] === action.payload.value);

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
} = todoSlice.actions;
export default todoSlice.reducer;