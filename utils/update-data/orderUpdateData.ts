import { ITodo }   from '../../interfaces/Todos/ITodo';
import IUpdateTodo from '../../interfaces/Todos/IUpdateTodo';

const orderUpdateData = ( todoState: IUpdateTodo, fetchedTodo: ITodo ) => {
  
  const todoBody: Partial<IUpdateTodo> = {};

  if (todoState.title !== fetchedTodo.title) {
    todoBody.title = todoState.title;
  }
  if (todoState.author !== fetchedTodo.author) {
    todoBody.author = todoState.author;
  }
  if (todoState.description !== fetchedTodo.description) {
    todoBody.description = todoState.description;
  }
  if (todoState.priority !== fetchedTodo.priority) {
    todoBody.priority = todoState.priority;
  }

  return todoBody;
};

export default orderUpdateData;