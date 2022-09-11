interface IErrorMessage {
  errors: any; //We use 'any' as we don't get much benefits from strong-typing it.
  customStyle?: string;
}

const ErrorMessage = ({ errors, customStyle }: IErrorMessage) => {
  return (
    <span className={`${ customStyle } col-12 text-danger fs-6 fw-bold`}>{ errors?.message }</span> 
  )
}

export default ErrorMessage
