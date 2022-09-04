import styles from '../../styles/Form/form.module.css';

interface IFormSubmitButtonProps {
  isValid: boolean;
}

const FormSubmitButton = ({ isValid }: IFormSubmitButtonProps) => {
  return (
    <button 
      className={`btn app-shadow-close ${ isValid ? styles['btn-enabled'] : styles['btn-disabled'] } fs-5`} 
      disabled={ !isValid }
    >
      <i className={`bi ${ isValid ? 'bi-send-fill' : 'bi-x-circle-fill' } me-2`} />
      Submit
    </button>
  )
}

export default FormSubmitButton;
