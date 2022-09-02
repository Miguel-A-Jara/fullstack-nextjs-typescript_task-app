import { Dispatch, SetStateAction, useState } from 'react';
import styles      from '../../styles/Input/PriorityInput.module.css';
import ReactSlider from 'react-slider';

import { ITodo } from '../../interfaces/Todos/ITodo';
import PriorityInputThumb from './PriorityInputThumb';

interface IPriorityInputProps {
  name:         keyof ITodo;
  value:        number;
  completed:    boolean;
  setTodoState: Dispatch<SetStateAction<ITodo | null>>;
}

const PriorityInput = ({ name, setTodoState, value, completed }: IPriorityInputProps) => {

  const [priorityState, setPriorityState] = useState(value);

  const handleChange = (e: number) => {
    setPriorityState(e);
    setTodoState((prev) => ({...prev as ITodo, [name]: e + 1}))
  };

  return (
    <div className={`${ completed && styles.completed }`}>
      <h4 className='mb-5 text-center text-lg-start'>Priority: { priorityState + 1 }</h4>
      <ReactSlider
        min={0}
        max={4}
        value={value - 1}
        className={styles['priority-track']}
        thumbClassName={styles['priority-thumb']}
        onChange={handleChange}
        renderThumb={(props, state) => (
          <div {...props}
          >
            <PriorityInputThumb value={(state.value + 1)} />
          </div>
        )}
      />
    </div> 
  )
}

export default PriorityInput;
