import { Dispatch, SetStateAction, useState } from 'react';
import { Controller } from 'react-hook-form';
import ReactSlider from 'react-slider';
import styles      from '../../styles/Input/PriorityInput.module.css';

import { ITodo }    from '../../interfaces/Todos/ITodo';
import ReactTooltip from 'react-tooltip';

interface IPriorityInputProps {
  name        : keyof ITodo;
  control     : any;
  myValue     : number;
  completed   : boolean;
  setTodoState: Dispatch<SetStateAction<ITodo | null>>;
}

const PriorityInput = ({ name, setTodoState, myValue, completed, control }: IPriorityInputProps) => {

  const [priorityState, setPriorityState] = useState(myValue - 1);

  const handleChange = (e: number) => {
    setPriorityState(e);
    setTodoState((prev) => ({...prev as ITodo, [name]: e + 1}))
  };

  return (
    <>
      <div className={`${completed && styles.completed}`}>
        <h4 className='d-none d-lg-block mb-5 text-center text-lg-start'>
          Priority: {priorityState + 1}
        </h4>
        <div className={`${styles['priority-wrapper']} py-5 rounded-lg`}>
          <Controller 
            name={name}
            control={control}
            defaultValue={myValue}
            render={({ field: { value, onChange } }) => (  
              <ReactSlider
                min={0}
                max={4}
                value={value - 1}
                className={styles['priority-track']}
                thumbClassName={styles['priority-thumb']}
                
                onChange={(e) => {
                  handleChange(e);
                  onChange(e + 1);
                }}

                renderThumb={(props, state) => (
                  <div
                    {...props}
                  >
                    <h3
                      className='h4 fw-bold'
                      data-tip={ priorityState + 1 }
                      data-for={ name }
                    >
                      { state.value + 1 }
                    </h3>
                  </div>
                )}
              />
            )}
          />
        </div>
      </div>
      <ReactTooltip 
        border
        backgroundColor='#11111a'
        className='tooltip'
        id={ name }
      >
        <div className='d-flex align-items-center justify-content-center text-secondary'>
          <small className='fs-6'>Priority: { priorityState + 1 }</small>
        </div>
      </ReactTooltip>
    </>
  );
}

export default PriorityInput;
