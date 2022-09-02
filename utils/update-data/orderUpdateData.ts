import { ITodo } from '../../interfaces/Todos/ITodo';

const orderUpdateData = ( todoState: ITodo, fetchedTodo: ITodo ) => {
  
  const todoBody: Partial<ITodo> = {};

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
  if (todoState.completed !== fetchedTodo.completed) {
    todoBody.completed = todoState.completed;
  }

  return todoBody;
};

export default orderUpdateData;