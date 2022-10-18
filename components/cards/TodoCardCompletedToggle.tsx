import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import card from '../../styles/Card/card.module.css';

import { updateTodo as updateTodoRedux } from '../../redux/slices/todoSlice';

import { ITodo }  from '../../interfaces/Todos/ITodo';
import updateTodo from '../../utils/update-data/updateTodo';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';

interface ITodoCardCompletedToggle {
  id: string;
  isCompleted: boolean;
  setTodoState?: Dispatch<SetStateAction<ITodo | null>>;
}

const TodoCardCompletedToggle = ({ isCompleted, setTodoState, id }: ITodoCardCompletedToggle) => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector(state => state.auth.token);
  const [isToggleOn, setIsToggleOn] = useState(isCompleted);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if(!token) router.push('/login');
  }, []);

  const toggleTodo = () => {

    if ( isUpdating ) return;

    setIsUpdating(true);

    updateTodo(id, { completed: !isCompleted }, token!)
      .then((data: ITodo) => {

        dispatch(updateTodoRedux({ _id: id, paramName: 'completed', paramValue: data.completed }));
        
        setIsToggleOn(data.completed);
        
        setIsUpdating(false);

        if ( setTodoState ) //This is only used in the [id] page to update the TodoState 
          setTodoState((prev) => ({...prev as ITodo, completed: data.completed}));

      });
  };

  return (
    <div
      className={`${card['card-toggle-container']} bg-white rounded-pill position-relative app-shadow-close`}
      style={{ width: 60, height: 20 }}
      onClick={toggleTodo}
    >
      <div 
        className={`app-shadow-close ${isToggleOn ? card['card-completed'] : card['card-not-completed']} ${ card['card-toggle'] }`} 
        style={{ width: 35, height: 35, top: -7.5 }}
      >
        <i 
          style={{width: 30, height: 30}} 
          className={`d-flex align-items-center justify-content-center fs-4 bi 
            ${ isToggleOn ? 'bi-emoji-sunglasses-fill' : 'bi-umbrella-fill' }
          `}
        >
        </i>
      </div>
    </div>
  )
}

export default TodoCardCompletedToggle
