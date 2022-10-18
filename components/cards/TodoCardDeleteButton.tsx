import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { deleteTodo as deleteTodoRedux } from '../../redux/slices/todoSlice';

import style from '../../styles/Card/card.module.css';
import deleteTodo from '../../utils/delete-data/deleteTodo';

interface ITodoCardDeleteButtonProps {
  id: string;
}

const TodoCardDeleteButton = ({ id }: ITodoCardDeleteButtonProps) => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {
    if ( !token ) 
      router.push('/login');
  }, []);

  const handleDelete = () => {
    deleteTodo(id, token!);
    
    dispatch(deleteTodoRedux(id))
  };

  return (
    <>
      <div 
        onClick={handleDelete}
        data-tip='Delete Task'
        className={`${style['card-delete-button']} app-shadow-close`}
      >
        <i className='bi bi-trash-fill fs-3'></i>
      </div>
    </>
  )
}

export default TodoCardDeleteButton;
