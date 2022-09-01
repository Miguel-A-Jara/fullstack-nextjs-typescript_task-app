import { ChangeEvent, useEffect, useState } from 'react';
import { filterTodos } from '../../redux/slices/todoSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';

const DropDownFilter = () => {

  const dispatch = useAppDispatch();
  const { todosCopy } = useAppSelector((state) => state.todos);
  
  const authorsArray = todosCopy.map((todo) => todo.author); //We make an array of authors
  const uniqueAuthors = authorsArray.filter((x, i, t) => t.indexOf(x) == i) //We get the unique values
  
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    
    setAuthors(uniqueAuthors);

  }, [todosCopy]);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterTodos(e.target.value));
  };

  return (
    <>
      <select className='form-select fw-bold fs-4' onChange={(e) => handleFilterChange(e)}>
        <option value='All'>All</option>
        {
          authors.map(author => (
            <option 
              key={author} 
              value={author}
            >
              {author}
            </option>
          ))
        }
      </select> 
    </>
  )
}

export default DropDownFilter;
