import { useState } from 'react'
import Image        from 'next/image';
import ReactTooltip from 'react-tooltip';
import styles from '../../styles/Input/TextAreaInput.module.css';

interface IFormImageInputProps {
  icon: string;
}

const FormImageInput = ({ icon }: IFormImageInputProps) => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ratio, setRatio] = useState(16/9);

  return (
    <>
      {selectedImage && (
        <div style={{ maxWidth: 500, maxHeight: 500 }}>
          <Image
            alt='Not found'
            src={URL.createObjectURL(selectedImage)}
            width={200}
            height={200 / ratio}
            layout='fixed' // you can use "responsive", "fill" or the default "intrinsic"
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
        onChange={(event) => {
          if (event && event.target && event.target.files)
            setSelectedImage(event.target.files[0]);
        }}
      />
    </>
  )
}

export default FormImageInput
