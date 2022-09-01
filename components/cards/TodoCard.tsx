import Link   from 'next/link';
import styles from '../../styles/Card/card.module.css';

import { ITodo } from '../../interfaces/Todos/ITodo';

import TodoCardDeleteButton    from './TodoCardDeleteButton';
import TodoCardCompletedToggle from './TodoCardCompletedToggle';

interface ITodoCardProps {
  cardsInfo: ITodo;
}

const TodoCard = ({ cardsInfo }: ITodoCardProps) => {
  return (
    <>
     <div className={`${ styles.card } col-4 card bg-primary my-4 position-relative pb-5`}>
      <div className='card-body'>
        <Link href={`/todo/${cardsInfo._id}`} >
          <a className={styles['card-link']}>
            <h3 className='card-title text-center fw-bold'>{ cardsInfo.title }</h3>
          </a>
        </Link>
        <h4 className='fw-light fst-italic card-subtitle mb-2'>
          <i className='bi bi-person-workspace me-2'></i>
          { cardsInfo.author }
        </h4>

        <hr />

        <p className='card-text'>{ cardsInfo.description }</p>

        <div 
          className='position-absolute d-flex align-items-center justify-content-between' 
          style={{bottom: 20, width: '80%'}}
        >
          <TodoCardCompletedToggle isCompleted={cardsInfo.completed} id={cardsInfo._id} />
          <TodoCardDeleteButton id={cardsInfo._id} />
        </div>
      </div>
    </div> 
    </>
  )
}

export default TodoCard
