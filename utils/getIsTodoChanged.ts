import { ITodo } from "../interfaces/Todos/ITodo";

type TTodo = ITodo | null;

const getIsTodoChanged = (fetchedTodo: TTodo, todoState: TTodo) => {

  if (!fetchedTodo || !todoState) return false; //If one of the todos does not exist, return false

  //We remove the "completed" property, because we don't need it.
  const filteredFetchedTodo: Partial<TTodo> = fetchedTodo;
  delete filteredFetchedTodo.completed;

  const filteredTodoState: Partial<TTodo> = todoState;
  delete filteredTodoState.completed;

  const isTodoChangedBoolean = JSON.stringify(filteredFetchedTodo) !== JSON.stringify(filteredTodoState);

  return isTodoChangedBoolean;
};

export default getIsTodoChanged;