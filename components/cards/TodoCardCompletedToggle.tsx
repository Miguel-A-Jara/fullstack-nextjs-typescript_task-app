import { Dispatch, SetStateAction, useState } from 'react';

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

  const toggleTodo = () => {
    updateTodo(id, { completed: !isCompleted })
      .then((data: ITodo) => {
        dispatch(updateTodoRedux({ _id: id, paramName: 'completed', paramValue: data.completed }));
        if ( setTodoState ) 
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
        className={`${isCompleted ? card['card-completed'] : card['card-not-completed']} ${ card['card-toggle'] }`} 
        style={{ width: 35, height: 35, top: -7.5 }}
      >
        <i 
          style={{width: 30, height: 30}} 
          className={`d-flex align-items-center justify-content-center fs-4 bi 
            ${ isCompleted ? 'bi-emoji-sunglasses-fill' : 'bi-umbrella-fill' }
          `}
        >
        </i>
      </div>
    </div>
  )
}

export default TodoCardCompletedToggle
