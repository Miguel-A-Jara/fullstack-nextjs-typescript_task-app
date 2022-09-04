interface IFormSubmitButtonProps {
  isValid: boolean;
}

const FormSubmitButton = ({ isValid }: IFormSubmitButtonProps) => {
  return (
    <button className={`btn text-white ${ isValid ? 'btn-success' : 'btn-danger' } fs-3`} disabled={ !isValid }>
      <i className={`bi ${ isValid ? 'bi-send-fill' : 'bi-x-circle-fill' } me-2`} />
      Submit
    </button>
  )
}

export default FormSubmitButton;
