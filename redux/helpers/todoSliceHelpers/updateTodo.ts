import { WritableDraft } from 'immer/dist/internal';
import { InitStateType } from '../../slices/todoSlice';
import { ITodo }         from '../../../interfaces/Todos/ITodo';

type ActionType = {
  payload: {
      _id: string;
      paramName: keyof ITodo;
      paramValue: unknown;
  };
  type: string;
}

const updateTodoHelper = (state: WritableDraft<InitStateType>, action: ActionType) => {
  
  const todo = state.todos.find (
    todo => todo._id === action.payload._id // Getting the Todo by id
  );

  if ( !todo ) return;

  // We update the todo, with a paramName sent in the payload, together with the paramValue
  const updatedTodo: ITodo = { ...todo, [action.payload.paramName]: action.payload.paramValue };

  return updatedTodo;
};

export default updateTodoHelper;