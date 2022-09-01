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
    <div onClick={handleDelete} className={style['card-delete-button']}>
      <i className='bi bi-trash-fill fs-3'></i>
    </div>
  )
}

export default TodoCardDeleteButton;
