import { ReactElement, useEffect, useState } from 'react'
import { useRouter }           from 'next/router';

import { NextPageWithLayout } from '../_app';

import { ITodo }     from '../../interfaces/Todos/ITodo';
import fetchTodos    from '../../utils/fetch-data/fetchTodos';
import EditableInput from '../../components/input/EditableInput';
import MainLayout    from '../../components/layout/MainLayout';
import TodoCardCompletedToggle from '../../components/cards/TodoCardCompletedToggle';
import PriorityInput from '../../components/input/PriorityInput';

const TodoPage: NextPageWithLayout = () => {

  const router = useRouter();
  const { id } = router.query;

  const [fetchedTodo, setFetchedTodo] = useState<ITodo | null>(null);
  const [todoState, setTodoState] = useState<ITodo | null>(null);
  const [isTodoChanged, setIsTodoChanged] = useState(false);

  useEffect(() => {
    
    const getTodoURL = `todos/${id}`;
    fetchTodos<ITodo>(getTodoURL)
      .then(data => {
        setFetchedTodo(data);
        setTodoState(data);
      })
  }, [id]);

  useEffect(() => {
    
    const isTodoChangedBoolean = JSON.stringify(fetchedTodo) !== JSON.stringify(todoState);
    setIsTodoChanged(isTodoChangedBoolean);

  }, [fetchedTodo, todoState]);

  return (
    <>
    {
      todoState && (
        <>
          <EditableInput 
            name='author' 
            style='display-2'
            text={todoState.author} 
            setTodoState={setTodoState} 
          />
          <EditableInput 
            name='title' 
            setTodoState={setTodoState} 
            text={todoState.title} 
          />
          <EditableInput 
            name='description' 
            setTodoState={setTodoState} 
            text={todoState.description} 
          />
          <PriorityInput
            name='priority'
            setTodoState={setTodoState} 
            value={todoState.priority} 
          />
          <TodoCardCompletedToggle id={todoState._id} isCompleted={todoState.completed} />

          <button className={`btn btn-primary`} disabled={ !isTodoChanged }>Send Me</button>
        </>
      )
    }
    </>
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
