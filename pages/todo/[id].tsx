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

import updateTodo       from '../../utils/update-data/updateTodo';
import IUpdateTodo      from '../../interfaces/Todos/IUpdateTodo';
import todoCardSchema   from '../../components/cards/todoCardSchema';
import orderUpdateData  from '../../utils/update-data/orderUpdateData';
import FormSubmitButton from '../../components/form/FormSubmitButton';

import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { updateTodo as updateTodoRedux } from '../../redux/slices/todoSlice';

const TodoPage: NextPageWithLayout = () => {

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();

  const [isTodoChanged, setIsTodoChanged] = useState(false);
  const [todoState, setTodoState] = useState<ITodo | null>(null);
  const [fetchedTodo, setFetchedTodo] = useState<ITodo | null>(null);

  const { register, handleSubmit, formState: { errors, isValid }, setError, setValue, control } = useForm<IUpdateTodo>({
    resolver: yupResolver(todoCardSchema()),
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

  const submitForm = (data: IUpdateTodo) => {
    
    if ( !fetchedTodo ) return;
    
    const parsedTodo = orderUpdateData(data, fetchedTodo);
    updateTodo(fetchedTodo._id, parsedTodo)
      .then((data: ITodo) => {
        setFetchedTodo(data);
        for (const field in parsedTodo) {
          dispatch(updateTodoRedux({ _id: data._id, paramName: (field as keyof ITodo), paramValue: parsedTodo[field] }));
        }
      })
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)} 
      className={`${styles['grid-container']} rounded-lg my-lg-3 py-5 row`}>
      
      <ImageContainer fetchedTodo={fetchedTodo} todoState={todoState} />

      <hr className='d-md-none my-4'/>

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
                errors={errors.title}
                style='fs-1 mb-1'
                text={todoState.title} 
                setTodoState={setTodoState} 
                register={register('title')}
              />
            </div>
            <div className={`${styles['description-item']}`}>
              <EditableInput 
                name='description'
                errors={errors.description}
                setTodoState={setTodoState} 
                style='fs-3'
                text={todoState.description} 
                register={register('description')}
              />
            </div>
            <div className={`${ styles['priority-toggle-container-item'] } row align-items-center m-0 p-0 mb-5`}>
              <div className='col-12 col-md-10'>
                <PriorityInput
                  name='priority'
                  control={control}
                  myValue={todoState.priority} 
                  setTodoState={setTodoState} 
                  completed={todoState.completed}
                />
              </div>
              <div className='col-12 col-md-2 d-flex justify-content-center align-items-center'>
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
        <FormSubmitButton text='Save Changes' isValid={ isTodoChanged && isValid } />
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
