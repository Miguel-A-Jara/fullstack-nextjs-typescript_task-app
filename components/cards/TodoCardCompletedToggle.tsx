import { useState } from 'react';

import card from '../../styles/Card/card.module.css';

import { updateTodo as updateTodoRedux } from '../../redux/slices/todoSlice';

import { ITodo }  from '../../interfaces/Todos/ITodo';
import updateTodo from '../../utils/update-data/updateTodo';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';

interface ITodoCardCompletedToggle {
  isCompleted: boolean;
  id: string;
}

const TodoCardCompletedToggle = ({ isCompleted, id }: ITodoCardCompletedToggle) => {

  const [isTodoCompleted, setIsTodoCompleted] = useState(isCompleted);
  const dispatch = useAppDispatch();

  const toggleTodo = () => {
    updateTodo(id, { completed: !isTodoCompleted })
      .then((data: ITodo) => {
        dispatch(updateTodoRedux({ _id: id, paramName: 'completed', paramValue: data.completed }));
        setIsTodoCompleted(data.completed);
      });
  };

  return (
    <div
      className={`${card['card-toggle-container']} bg-white rounded-pill position-relative`}
      style={{ width: 60, height: 20 }}
      onClick={toggleTodo}
    >
      <div 
        className={`${isTodoCompleted ? card['card-completed'] : card['card-not-completed']} ${ card['card-toggle'] }`} 
        style={{ width: 35, height: 35, top: -7.5 }}
      >
        <i 
          style={{width: 20, height: 20}} 
          className={`d-flex align-items-center justify-content-center fs-4 bi 
            ${ isTodoCompleted ? 'bi-emoji-sunglasses-fill' : 'bi-umbrella-fill' }
          `}
        >
        </i>
      </div>
    </div>
  )
}

export default TodoCardCompletedToggle
