import ReactTooltip from 'react-tooltip';

import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { deleteTodo as deleteTodoRedux } from '../../redux/slices/todoSlice';

import style from '../../styles/Card/card.module.css';

interface ITodoCardDeleteButtonProps {
  id: string;
}

const TodoCardDeleteButton = ({ id }: ITodoCardDeleteButtonProps) => {

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteTodoRedux(id));
  };

  return (
    <>
      <div 
        onClick={handleDelete}
        data-tip='fdfjdj'
        className={`${style['card-delete-button']} app-shadow-close`}
      >
        <i className='bi bi-trash-fill fs-3'></i>
      </div>
      <ReactTooltip 
        border
        backgroundColor='#11111a'
      >
        <div className='d-flex align-items-center justify-content-center text-secondary'>
          <i className='bi bi-x-circle-fill me-1 fs-5' />
          <small className='fs-6'>Delete Task</small>
        </div>
      </ReactTooltip>
    </>
  )
}

export default TodoCardDeleteButton;
