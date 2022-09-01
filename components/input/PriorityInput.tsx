import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import styles from '../../styles/Input/PriorityInput.module.css';

import { ITodo } from '../../interfaces/Todos/ITodo';

interface IPriorityInputProps {
  name: keyof ITodo;
  setTodoState: Dispatch<SetStateAction<ITodo | null>>;
  value: number;
}

const PriorityInput = ({ name, setTodoState, value }: IPriorityInputProps) => {

  const [inputState, setInputState] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(+e.target.value); //We convert it to a number
    setTodoState((prev) => ({...prev as ITodo, [name]: +e.target.value}));
  };

  return (
    <div>
      <input 
        min={1}
        max={5}
        name={name} 
        type='range' 
        value={inputState} 
        onChange={(e) => handleChange(e)}
        className={`${styles.priority}`}
      />
    </div>
  )
}

export default PriorityInput;
