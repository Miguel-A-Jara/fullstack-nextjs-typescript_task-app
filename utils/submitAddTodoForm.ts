import { NextRouter }      from 'next/router';
import { UseFormSetError } from 'react-hook-form';

import { ITodo }   from './../interfaces/Todos/ITodo';
import IFormFields from '../components/form/IFormFields';
import TDispatch   from '../interfaces/types/TDispatch';

import todoFormSendData                from './send-Data/todoFormSendData';
import { addTodo, updateFilterParams } from '../redux/slices/todoSlice';

type TRouter   = NextRouter;
type TSetError = UseFormSetError<IFormFields>;
type TSetIsSubmitting = React.Dispatch<React.SetStateAction<boolean>>;

const submitAddTodoForm = async (
  data           : IFormFields, 
  setIsSubmitting: TSetIsSubmitting, 
  router         : TRouter, 
  dispatch       : TDispatch, 
  setError       : TSetError,
) => {

  try {

    setIsSubmitting(true);

    const resp = await todoFormSendData(data);
    const { respData, respImag } = resp;

    if ( respData._id && respImag.name ) {
      //If we received an ID and a name then it means the TODO was created
      
      const todo: ITodo = {...respData, ...respImag};

      dispatch(addTodo(todo)); //We add the todo to the Redux State.
      dispatch(updateFilterParams(null)); //We reset the filter params.

      router.push(`/todo/${respData._id}`); //Finally we push the user to a new route.
    }

    if (respData.statusCode === 400) {
      setError('title', { type: 'custom', message: respData.message });
      setIsSubmitting(false);
    }

  } catch (error) {
    setIsSubmitting(false);
    console.log(error);
  }
};

export default submitAddTodoForm;