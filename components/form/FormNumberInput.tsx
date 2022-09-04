import { UseFormRegisterReturn } from 'react-hook-form';
import ReactTooltip              from 'react-tooltip';

import styles from '../../styles/Form/form.module.css';

interface IFormNumberInputProps {
  text: string;
  register: UseFormRegisterReturn;
  errors: any; //We use 'any' as we don't get much benefits from strong-typing it.
  icon: string;
}

const FormNumberInput = ({ text, register, errors, icon }: IFormNumberInputProps ) => {
  return (
    <div className='col-12 col-lg-6 row align-items-start mb-3'>
      <label 
        htmlFor={ text }
        data-tip={ text }
        data-for={ text }
        className={`${ styles.label } d-flex align-items-center justify-content-lg-end col-12 col-lg-2 fs-4`}
      >
        <i className={`bi ${icon} me-3 fs-3`} />
        <small className='d-lg-none'>{ text }</small>

      </label>

      <div className='col-12 col-lg-10 p-0'>
        <input
          id={ text }
          type='number'
          autoComplete='off'
          {...register}
          placeholder={`${ text }...`}
          className={`${ !errors ? styles.input : styles['input-error'] } form-control fs-5 fw-bold`}
        />
    
        <span className='col-12 text-danger fs-6 fw-bold'>{ errors?.message }</span> 
      </div>

      <ReactTooltip
        border
        backgroundColor='#11111a'
        className='tooltip'
        id={text}
      >
        <div className='d-flex align-items-center justify-content-center text-secondary'>
          <small className='fs-6'>{ text }</small>
        </div>
      </ReactTooltip>
    </div>
  )
}

export default FormNumberInput;
