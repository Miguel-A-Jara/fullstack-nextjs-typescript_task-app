import { useEffect, useState } from 'react';

import ReactTooltip              from 'react-tooltip';
import { UseFormRegisterReturn } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';
import styles       from '../../styles/Form/form.module.css';

interface IFormTextInputProps {
  errors  : any; //We use 'any' as we don't get much benefits from strong-typing it.
  text    : string;
  icon    : string;
  type   ?: 'text' | 'number' | 'password';
  register: UseFormRegisterReturn;
}

const FormTextInput = ({ text, register, errors, icon, type = 'text' }: IFormTextInputProps ) => {

  const [isMounted, setIsMounted] = useState(false); //This makes sure that ReactTooltip works properly

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div className='col-12 col-lg-6 row align-items-start justify-content-start mb-3'>
        <label
          htmlFor ={ text }
          data-tip={ text }
          data-for={ text }
          className={`${ styles.label } d-flex align-items-center justify-content-lg-center col-12 col-lg-1 fs-4`}
        >
          <i className={`bi ${icon} me-3 me-lg-0 fs-3`}/>
          <small className='d-lg-none'>{ text }</small>
        </label>
      
        <div className='col-12 col-lg-11 p-0'>
          <input
            id={ text }
            type={type}
            autoComplete='off'
            {...register}
            placeholder={`${ text }...`}
            className={`${ errors ? styles['input-error'] : styles.input } form-control fs-5 fw-bold app-shadow-close`}
          />
      
          <ErrorMessage errors={errors} />
        </div>
      
      </div>

      {
        isMounted && (
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
        )
      }
    </>
  )
}

export default FormTextInput;
