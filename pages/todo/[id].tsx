import { ReactElement, useEffect, useState } from 'react'
import { useRouter }           from 'next/router';

import { NextPageWithLayout } from '../_app';

import { ITodo }     from '../../interfaces/Todos/ITodo';
import fetchTodos    from '../../utils/fetch-data/fetchTodos';
import EditableInput from '../../components/input/EditableInput';
import MainLayout    from '../../components/layout/MainLayout';
import TodoCardCompletedToggle from '../../components/cards/TodoCardCompletedToggle';
import PriorityInput from '../../components/input/PriorityInput';
import Image from 'next/image';

const TodoPage: NextPageWithLayout = () => {

  const router = useRouter();
  const { id } = router.query;

  const [fetchedTodo, setFetchedTodo] = useState<ITodo | null>(null);
  const [todoState, setTodoState] = useState<ITodo | null>(null);
  const [isTodoChanged, setIsTodoChanged] = useState(false);
  const [image, setImage] = useState<any>(null);

  useEffect(() => {

    if ( !todoState ) {

      const getTodoURL = `todos/${id}`;
      fetchTodos<ITodo>(getTodoURL)
        .then((data: ITodo) => {
          setFetchedTodo(data);
          setTodoState(data);
        });
    }

  }, [id, todoState]);

  useEffect(() => {

    if ( !fetchedTodo ) return;

    const getTodoImg = `http://localhost:3500/todos/image/${fetchedTodo?._id}`

    fetch(getTodoImg).then(data => data.blob()).then(resp => {
      const imag = URL.createObjectURL(resp);
      setImage(imag);
    });

  }, [fetchedTodo]);

  useEffect(() => {
    
    const isTodoChangedBoolean = JSON.stringify(fetchedTodo) !== JSON.stringify(todoState);
    setIsTodoChanged(isTodoChangedBoolean);

  }, [fetchedTodo, todoState]);

  return (
    <div className='row mt-3'>

    { image && (
      <Image 
        src={ image }  
        alt={todoState?.title}
        width={200}
        height={120}
      />
    )}

    {
      todoState && (
        <>
          <div className='col-12 col-lg-6'>
            <EditableInput 
              name='author' 
              style='display-3 fw-bold'
              text={todoState.author} 
              setTodoState={setTodoState} 
            />
          </div>
          <div className='col-12 d-lg-none'>
            <EditableInput 
              name='title'
              text={todoState.title} 
              setTodoState={setTodoState} 
              style='fw-light fs-4 fst-italic'
            />
          </div>
          <div className='col-12 col-lg-6'>
            <EditableInput 
              name='description'
              setTodoState={setTodoState} 
              text={todoState.description} 
            />
          </div>
          <div className='d-none d-lg-block col-lg-6'>
            <EditableInput 
              name='title'
              text={todoState.title} 
              setTodoState={setTodoState} 
            />
          </div>
          <div className='row m-0 p-0'>
            <div className='col-12 col-lg-11 my-5'>
              <PriorityInput
                name='priority'
                completed={todoState.completed}
                setTodoState={setTodoState} 
                value={todoState.priority} 
              />
            </div>
            <div className='col-12 col-lg-1 my-5 d-flex justify-content-center justify-content-lg-end align-items-center'>
              <TodoCardCompletedToggle 
                id={todoState._id}
                setTodoState={setTodoState}
                isCompleted={todoState.completed} 
              />
            </div>
          </div>

          <button className={`btn btn-primary`} disabled={ !isTodoChanged }>Send Me</button>
        </>
      )
    }
    </div>
  )
}

TodoPage.getLayout = function (page: ReactElement) {
  return (
    <MainLayout>
      { page }
    </MainLayout>
  )
}

export default TodoPage;
