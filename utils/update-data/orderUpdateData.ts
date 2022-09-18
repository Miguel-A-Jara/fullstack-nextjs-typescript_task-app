import { ITodo }   from '../../interfaces/Todos/ITodo';
import IUpdateTodo from '../../interfaces/Todos/IUpdateTodo';

/* This function parses the todo, to ONLY update the values that have changed. */

const orderUpdateData = ( todoState: IUpdateTodo, fetchedTodo: ITodo ) => {

  const todoBody: Partial<IUpdateTodo> = {};

  for (const parameter in todoState) {
    if ( todoState[parameter] !== fetchedTodo[parameter] ) {
      todoBody[parameter] = todoState[parameter];
    };
  };

  return todoBody;
};

export default orderUpdateData;