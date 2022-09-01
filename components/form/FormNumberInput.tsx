import { UseFormRegisterReturn } from 'react-hook-form';

interface IFormNumberInputProps {
  text: string;
  register: UseFormRegisterReturn;
  errors: any; //We use 'any' as we don't get much benefits from strong-typing it.
  icon: string;
}

const FormNumberInput = ({ text, register, errors, icon }: IFormNumberInputProps ) => {
  return (
    <div className='col-12'>
      <label htmlFor='exampleInputEmail1' className='col-12 form-label fs-4'>
      <i className={`bi ${icon} me-3 fs-3`}></i>
        { text }
      </label>
      <input 
        type='number' 
        className='form-control fs-5 fw-bold mb-3' 
        placeholder={ text } 
        {...register} 
      />
      { errors && <span className='text-danger fs-4 fw-bold'>{ errors.message }</span> }
    </div>
  )
}

export default FormNumberInput;
