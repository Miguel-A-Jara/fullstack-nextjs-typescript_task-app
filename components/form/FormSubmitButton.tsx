import styles from '../../styles/Form/form.module.css';

interface IFormSubmitButtonProps {
  isValid: boolean;
  text  ?: string;
}

const FormSubmitButton = ({ isValid, text = 'Submit' }: IFormSubmitButtonProps) => {
  return (
    <button 
      className={`btn app-shadow-close ${ isValid ? styles['btn-enabled'] : styles['btn-disabled'] } fs-5`} 
      disabled={ !isValid }
    >
      <i className={`bi ${ isValid ? 'bi-send-fill' : 'bi-x-circle-fill' } me-2`} />
      { text }
    </button>
  )
}

export default FormSubmitButton;
