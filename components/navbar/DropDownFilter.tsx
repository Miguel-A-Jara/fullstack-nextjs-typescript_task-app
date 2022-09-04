import { ChangeEvent, useEffect, useState } from 'react';
import Select from 'react-select';

import { filterTodos, updateFilterParams, updateTodo } from '../../redux/slices/todoSlice';
import DropDownStyles  from './DropDownStyles';
import { ITodo }       from '../../interfaces/Todos/ITodo';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';

type DropDownValues = { value: string, label: string };

interface IDropDownFilterProps {
  fieldToFilter: keyof ITodo;
  placeholderText: string;
}

const DropDownFilter = ({ fieldToFilter, placeholderText }: IDropDownFilterProps) => {

  const dispatch = useAppDispatch();
  const { todosCopy } = useAppSelector((state) => state.todos);
  
  const valuesArray = todosCopy.map((todo) => todo[fieldToFilter]); //We make an array of values
  const uniqueValues = valuesArray.filter((x, i, t) => t.indexOf(x) == i) //We get the unique values
  
  const [values, setValues] = useState<string[] | boolean[]| number[]>([]);

  useEffect(() => {

    // IF uniqueValues includes boolean values, the the array is a boolean array;
    if ( uniqueValues.includes(true) || uniqueValues.includes(false) ) {
      setValues(uniqueValues as boolean[]);
    }

    // Else, is a string array;
    setValues(uniqueValues as string[]);

  }, [todosCopy]);

  const handleFilterChange = (e: DropDownValues | unknown) => {
    
    if ( !e ) { //If e does not exist, then nothing is selected, so we send "All"
      dispatch(updateFilterParams({ param: fieldToFilter, value: 'All' }));
      dispatch(filterTodos());
      return;
    }
    
    const value: DropDownValues = e as DropDownValues; //Casting
    dispatch(updateFilterParams({ param: fieldToFilter, value: value.value }));
    dispatch(filterTodos());

  };

  const options = values.map(a => {
    
    if ( typeof a === 'string' ) {
      return { value: a, label: a };
    }

    if ( typeof a === 'number' ) {
      return { value: a, label: a.toString() };
    }

    if ( typeof a === 'boolean' ) {
      return { value: a, label: a ? 'Completed' : 'Not Completed' };
    }
    
  });

  return (
    <>
      <Select 
        options={options} 
        isClearable={true}
        instanceId={ placeholderText }
        styles={DropDownStyles}
        onChange={handleFilterChange}
        placeholder={ placeholderText }
        noOptionsMessage={() => (
          <div className='d-flex justify-content-start gap-2'><i className='bi bi-search'/> Not Found...</div>
        )}
      />
    </>
  )
}

export default DropDownFilter;
