import { useEffect, useState } from 'react'
import Image from 'next/image';

import { UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';

import IFormFields from './IFormFields';


interface IFormImageInputProps {
  errors: any; //We use 'any' as we don't get much benefits from strong-typing it.
  icon: string;
  register: UseFormRegisterReturn;
  watchValue: UseFormWatch<IFormFields>;
}

const FormImageInput = ({ icon, errors, register, watchValue }: IFormImageInputProps) => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ratio, setRatio] = useState(16/9);

  const imageVal = watchValue('image');

  useEffect(() => {
    
    if (imageVal && selectedImage) {
      setSelectedImage(imageVal[0]);
    } 

  }, [imageVal]);

  return (
    <>
      {selectedImage && (
        <div style={{ maxWidth: 500, maxHeight: 500 }}>
          <Image
            width={200}
            layout='fixed'
            alt='Not found'
            height={200 / ratio}
            src={URL.createObjectURL(selectedImage)}
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              setRatio(naturalWidth / naturalHeight)
            }
          />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />
      <input
        type='file'
        {...register}
      />
      <span className='col-12 text-danger fs-6 fw-bold'>{errors?.message}</span>
    </>
  );
}

export default FormImageInput
