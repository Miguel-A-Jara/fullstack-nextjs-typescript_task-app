import Image from 'next/image';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ITodo } from '../../interfaces/Todos/ITodo';
import styles    from '../../styles/task/grid-task.module.css';

interface IImageContainerProps {
  todoState  : ITodo | null;
  fetchedTodo: ITodo | null;
};

const ImageContainer = ({ todoState, fetchedTodo }: IImageContainerProps) => {

  const [ratio, setRatio] = useState( 16 / 9 );
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {

    if ( !fetchedTodo ) return;

    const getTodoImg = `http://localhost:3500/todos/image/${fetchedTodo?._id}`

    fetch(getTodoImg)
      .then(data => data.blob())
      .then(resp => {
        const imag = URL.createObjectURL(resp);
        setImage(imag);
      });

  }, [fetchedTodo]);


  return (
    <div
      className={`${styles['img-item']} img-wrapper d-flex align-items-center justify-content-center px-3`}
    >
      {image ? (
        <Image
          width={400}
          src={image}
          layout='intrinsic'
          objectFit='contain'
          height={Math.trunc(400 / ratio)}
          alt={todoState?.title}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>{
              setRatio(naturalWidth / naturalHeight);
              console.log(400 / ratio);
            }
          }
        />
      ) : (
        <Skeleton
          width={270}
          height={270 / ratio}
          enableAnimation={false}
          className='d-block bg-primary mx-auto app-shadow-close'
        />
      )}
    </div>
  );
}

export default ImageContainer;
