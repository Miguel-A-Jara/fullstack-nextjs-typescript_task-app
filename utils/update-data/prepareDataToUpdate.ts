import { ITodo } from './../../interfaces/Todos/ITodo';
const prepareDataToUpdate = (originalData: ITodo | null, changedData: ITodo | null) => {
  
  let formatedData: Partial<ITodo> = {};

  const oldData = originalData!;
  const newData = changedData!;


  if ( oldData.title       !== newData.title       ) formatedData.title       = newData.title;
  if ( oldData.author      !== newData.author      ) formatedData.author      = newData.author;
  if ( oldData.priority    !== newData.priority    ) formatedData.description = newData.description;
  if ( oldData.description !== newData.description ) formatedData.description = newData.description;

  return formatedData;

};

export default prepareDataToUpdate;