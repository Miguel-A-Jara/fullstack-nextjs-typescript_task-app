/* ===== React & Next Imports ===== */
import { ReactElement, useEffect, useState } from 'react'
import { useRouter }           from 'next/router';
import Head from 'next/head';


/* ===== Libraries Imports ===== */
import { useForm }            from 'react-hook-form';
import { yupResolver }        from '@hookform/resolvers/yup';


/* ===== Interfaces Imports ===== */
import { ITodo }      from '../../interfaces/Todos/ITodo';
import IUpdateTodo    from '../../interfaces/Todos/IUpdateTodo';


/* ===== Utility Functions ===== */
import fetchTodos         from '../../utils/fetch-data/fetchTodos';
import submitIdForm       from '../../utils/submitIdForm';
import getIsTodoChanged   from '../../utils/getIsTodoChanged';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import useAuth            from '../../hooks/useAuth';


/* ===== Components Imports ===== */
import { NextPageWithLayout }  from '../_app';
import EditableInput           from '../../components/input/EditableInput';
import MainLayout              from '../../components/layout/MainLayout';
import PriorityInput           from '../../components/input/PriorityInput';
import ImageContainer          from '../../components/cards/ImageContainer';
import todoCardSchema          from '../../components/cards/todoCardSchema';
import FormSubmitButton        from '../../components/form/FormSubmitButton';
import TodoCardCompletedToggle from '../../components/cards/TodoCardCompletedToggle';


import styles         from '../../styles/task/grid-task.module.css';

const TodoPage: NextPageWithLayout = () => {

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const { isAuthenticated, user } = useAuth();

  const [todoState, setTodoState]         = useState<ITodo | null>(null);
  const [fetchedTodo, setFetchedTodo]     = useState<ITodo | null>(null);
  const [isTodoChanged, setIsTodoChanged] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid }, control } = useForm<IUpdateTodo>({
    resolver: yupResolver(todoCardSchema()),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  useEffect(() => {

    if ( todoState || !id ) return;

    if (!isAuthenticated || !token) {
      router.push('/login');
    }

    const getTodoURL = `todos/${id}`;

    fetchTodos<ITodo>(getTodoURL, token!)
      .then((data: ITodo) => {
        setFetchedTodo(data);
        setTodoState(data);
      });
    

  }, [id, todoState]);

  useEffect(() => {
    
    setIsTodoChanged(getIsTodoChanged(fetchedTodo, todoState));

  }, [fetchedTodo, todoState]);

  return (
    <>
      <Head>
        <title>{todoState?.author ?? '- Task'} - {todoState?.title ?? ''}</title>
      </Head>

      <form
        onSubmit={handleSubmit((data) => submitIdForm(data, fetchedTodo, dispatch, setFetchedTodo, token!))}
        className={`${styles['grid-container']} rounded-lg my-lg-3 py-5 row`}
      >
        <ImageContainer token={token!} fetchedTodo={fetchedTodo} todoState={todoState} />
        <hr className='d-md-none my-4'/>
        {
          todoState && (
            <>
              <div className={`${styles['author-item']}`}>
                <h2 
                  className={`${styles['text-area']} display-3 fw-bold w-100 p-2 border-0`}
                >
                  {todoState.author}
                </h2>
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
