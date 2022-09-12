import { 
  ChangeEvent, 
  Dispatch, 
  RefObject, 
  SetStateAction, 
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from '../../styles/Input/TextAreaInput.module.css';

import { ITodo } from '../../interfaces/Todos/ITodo';
import ErrorMessage from '../form/ErrorMessage';

interface IEditableInputProps {
  errors  : any; //We use 'any' as we don't get much benefits from strong-typing it.
  text    : string;
  style?  : string;
  name    : keyof ITodo;
  register: UseFormRegisterReturn;

  setTodoState: Dispatch<SetStateAction<ITodo | null>>;
}

const resizeTextArea = (e: ChangeEvent<HTMLTextAreaElement> | RefObject<HTMLTextAreaElement>) => {
  // This function implements two types, because we need to call it for the first time
  // as a 'useRef' to resize the element (inside the useEffect that calls 'resizeTextArea')
  // and later on, we have the HTMLDivElement that is called on every change event

  if ( 'current' in e ) {
    const textArea = e.current;
    if ( !textArea ) return;
    textArea.style.height = 'inherit';
    textArea.style.height = `${e.current!.scrollHeight}px`;
    return;
  }

  e.target.style.height = `inherit`;
  e.target.style.height = `${e.target.scrollHeight}px`;
};

const EditableInput = ({ style, text, setTodoState, name, register, errors }: IEditableInputProps) => {

  const [textValue, setTextValue] = useState(text);
  const myElement = useRef<HTMLTextAreaElement | null>(null);
  const myRegister = register;

  useEffect(() => {

    resizeTextArea(myElement);

    window.addEventListener('resize', function(){
      setTimeout(() => {
        resizeTextArea(myElement);
      }, 300);
    });
    
    return () => {
      window.addEventListener('resize', function(){
        setTimeout(() => {
          resizeTextArea(myElement);
        }, 300);
      });
    };

  }, [myElement]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextArea(e);
    setTodoState((prev) => ({...prev as ITodo, [name]: e.target.value}));
    setTextValue(e.target.value);
  };

  return (
    <>
      <textarea
        rows={1}
        value={textValue}
        placeholder={ `${name.slice(0, 1).toUpperCase()}${name.slice(1, name.length)}` } //Making it uppercase
        onFocus={resizeTextArea}
        {...myRegister}

        ref={((el: HTMLTextAreaElement) => {
          myElement.current = el; 
          myRegister.ref(el)
        })}

        onChange={(e) => {
          myRegister.onChange(e);
          handleChange(e);
        }}
        
        className={`${styles['text-area']} ${style} w-100 ps-2 border-0`}
      >
      </textarea>
      <ErrorMessage customStyle='text-center d-block mb-4' errors={errors} />
    </>
  )
}

export default EditableInput;
