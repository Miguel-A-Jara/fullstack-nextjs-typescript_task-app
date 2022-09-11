import { ReactElement, useEffect, useState } from 'react'
import { useRouter }           from 'next/router';

import { useForm }            from 'react-hook-form';
import { yupResolver }        from '@hookform/resolvers/yup';
import { NextPageWithLayout } from '../_app';

import { ITodo }      from '../../interfaces/Todos/ITodo';
import fetchTodos     from '../../utils/fetch-data/fetchTodos';
import EditableInput  from '../../components/input/EditableInput';
import MainLayout     from '../../components/layout/MainLayout';
import PriorityInput  from '../../components/input/PriorityInput';
import styles         from '../../styles/task/grid-task.module.css';
import ImageContainer from '../../components/cards/ImageContainer';
import TodoCardCompletedToggle from '../../components/cards/TodoCardCompletedToggle';

import { schema } from '../../components/form/Form';
import IFormFields from '../../components/form/IFormFields';
import FormSubmitButton from '../../components/form/FormSubmitButton';

const TodoPage: NextPageWithLayout = () => {

  const router = useRouter();
  const { id } = router.query;

  const [isTodoChanged, setIsTodoChanged] = useState(false);
  const [todoState, setTodoState] = useState<ITodo | null>(null);
  const [fetchedTodo, setFetchedTodo] = useState<ITodo | null>(null);

  const { register, handleSubmit, formState: { errors, isValid }, setError, setValue } = useForm<IFormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

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
    
    const isTodoChangedBoolean = JSON.stringify(fetchedTodo) !== JSON.stringify(todoState);
    setIsTodoChanged(isTodoChangedBoolean);

  }, [fetchedTodo, todoState]);

  const submitForm = (data: IFormFields) => {
    alert('Hey!')
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)} 
      className={`${styles['grid-container']} rounded-lg mt-lg-5 py-4 row`}>
      
      <ImageContainer fetchedTodo={fetchedTodo} todoState={todoState} />

      {
        todoState && (
          <>
            <div className={`${styles['author-item']}`}>
              <EditableInput 
                name='author' 
                errors={errors.author}
                text={todoState.author} 
                style='display-3 fw-bold'
                setTodoState={setTodoState}
                register={register('author')}
              />
            </div>
            <div className={`${styles['title-item']}`}>
              <EditableInput 
                name='title'
                text={todoState.title} 
                setTodoState={setTodoState} 
                errors={errors.title}
                register={register('title')}
              />
            </div>
            <div className={`${styles['description-item']}`}>
              <EditableInput 
                name='description'
                setTodoState={setTodoState} 
                text={todoState.description} 
                errors={errors.description}
                register={register('description')}
              />
            </div>
            <div className={`${ styles['priority-toggle-container-item'] } row align-items-center m-0 p-0 mb-5`}>
              <div className='col-12 col-md-11'>
                <PriorityInput
                  name='priority'
                  completed={todoState.completed}
                  setTodoState={setTodoState} 
                  value={todoState.priority} 
                />
              </div>
              <div className='col-12 col-md-1 d-flex justify-content-center justify-content-md-end align-items-center'>
                <TodoCardCompletedToggle 
                  id={todoState._id}
                  setTodoState={setTodoState}
                  isCompleted={todoState.completed} 
                />
              </div>
            </div>

          </>
        )
      }
      <div className={`${styles['button-item']} d-flex justify-content-center justify-content-md-end align-items-center`}>
        <FormSubmitButton text='Save Changes' isValid={ isTodoChanged } />
      </div>
    </form>
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
