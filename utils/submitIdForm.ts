import { ITodo }   from './../interfaces/Todos/ITodo';
import IUpdateTodo from '../interfaces/Todos/IUpdateTodo';
import TDispatch   from '../interfaces/types/TDispatch';

import updateTodo      from './update-data/updateTodo';
import orderUpdateData from './update-data/orderUpdateData';

import { updateTodo as updateTodoRedux } from '../redux/slices/todoSlice';

type TFetchedTodo    = ITodo | null;
type TSetFetchedTodo = React.Dispatch<React.SetStateAction<ITodo | null>>

const submitIdForm = async (
  data          : IUpdateTodo, 
  fetchedTodo   : TFetchedTodo, 
  dispatch      : TDispatch, 
  setFetchedTodo: TSetFetchedTodo
) => {
    
  if ( !fetchedTodo ) return;
  
  const parsedTodo = orderUpdateData(data, fetchedTodo); //Before updating the Todo, we must parse it.

  const resp: ITodo = await updateTodo(fetchedTodo._id, parsedTodo); //The response is the updated Todo.

  setFetchedTodo(resp); //We update our local Fetched Todo.

  /* Finally, we update the fields of our Todo in our Redux State. */
  for ( const field in parsedTodo ) {
    dispatch(updateTodoRedux(
      {
        _id       : resp._id, 
        paramValue: parsedTodo[field],
        paramName : (field as keyof ITodo), 
      }
    ));
  }
};

export default submitIdForm;