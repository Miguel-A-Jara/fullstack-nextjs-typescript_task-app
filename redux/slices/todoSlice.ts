import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from './../../interfaces/Todos/ITodo';

type InitStateType = {
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
    startLoadingTodos: (state) => {
      state.isLoading = true;
    },
    setTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.todosCopy = action.payload;
    },
    updateTodo: (state, action: PayloadAction<{ _id: string, paramName: keyof ITodo, paramValue: unknown }>) => {
      // Getting the Todo by id
      const todo = state.todos.find(todo => todo._id === action.payload._id);
      if (!todo) return state; // If a todo was not found, we just return the state

      // We update the todo, with a paramName sent in the payload, together with the paramValue
      const updatedTodo: ITodo = { ...todo, [action.payload.paramName]: action.payload.paramValue };
      state.todos = state.todos.map( todo => todo._id === updatedTodo._id ? updatedTodo : todo );
      state.todosCopy = state.todos;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => ( todo._id !== action.payload ));
      state.todosCopy = state.todos;
    },
    filterTodos: (state, action: PayloadAction<string>) => {
      if (action.payload === 'All') {
        state.todos = state.todosCopy;
        return;
      }

      state.todos = state.todosCopy.filter(todo => todo.author === action.payload);
    },
  }
});

export const { 
  startLoadingTodos,
  setTodos,
  updateTodo,
  deleteTodo,
  filterTodos,
} = todoSlice.actions;
export default todoSlice.reducer;