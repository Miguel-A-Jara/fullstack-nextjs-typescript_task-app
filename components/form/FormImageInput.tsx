import { useEffect, useState } from 'react'
import Image from 'next/image';

import { UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import IFormFields from './IFormFields';
import styles from '../../styles/Input/ImageInput.module.css';


interface IFormImageInputProps {
  errors    : any; //We use 'any' as we don't get much benefits from strong-typing it.
  register  : UseFormRegisterReturn;
  setValue  : UseFormSetValue<IFormFields>;
  watchValue: UseFormWatch<IFormFields>;
}

const FormImageInput = ({ errors, register, watchValue, setValue }: IFormImageInputProps) => {

  const handleRemove = () => {
    setValue('image', null);
    setSelectedImage(null);
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ratio, setRatio] = useState(16/9);

  const imageVal = watchValue('image');

  useEffect(() => {

    if ( imageVal ) {
      setSelectedImage(imageVal[0]);
    }

  }, [imageVal]);

  return (
    <div className='col-12 row justify-content-center'>
      <>
        {selectedImage
        ? (
            <Image
              width={400}
              objectFit='contain'
              layout='fixed'
              alt='Not found'
              className='rounded'
              height={400 / ratio}
              src={URL.createObjectURL(selectedImage)}
              onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
            />
          ) : (
            <Skeleton
              width={'max(25vw, 200px)'}
              height={'max(25vw, 200px)'}
              enableAnimation={false}
              className='d-block bg-primary mx-auto app-shadow-close'
            />
          )
        }
        <button
          type='button'
          onClick={handleRemove}
          disabled={!selectedImage}
          className='btn btn-primary fs-4 my-3'
        >
          Remove
        </button>
      </>
      <input
        type='file'
        accept='image/*'
        className={`${ !errors ? styles.input : styles['input-error'] } form-control fs-5 fw-bold app-shadow-close`}
        {...register}
      />
      <span className='col-12 text-danger fs-6 fw-bold'>{errors?.message}</span>
    </div>
  );
}

export default FormImageInput
