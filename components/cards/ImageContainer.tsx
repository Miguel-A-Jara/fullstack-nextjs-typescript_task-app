import { useEffect, useState } from 'react';
import Image from 'next/image';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import { ITodo } from '../../interfaces/Todos/ITodo';
import styles    from '../../styles/task/grid-task.module.css';

interface IImageContainerProps {
  todoState  : ITodo | null;
  fetchedTodo: ITodo | null;
};

const ImageContainer = ({ todoState, fetchedTodo }: IImageContainerProps) => {

  const [ratio, setRatio] = useState( 4 / 3 );
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {

    if ( !fetchedTodo ) return;

    const getTodoImg = `${process.env.NEXT_PUBLIC_BASE_URL}todos/image/${fetchedTodo?._id}`

    fetch(getTodoImg)
      .then(data => data.blob())
      .then(resp => {
        const imag = URL.createObjectURL(resp);
        setImage(imag);
      });

  }, [fetchedTodo]);


  return (
    <div
      className={`${styles['img-item']} img-wrapper d-flex align-items-center justify-content-center px-3 mb-md-3`}
    >
      {image ? (
        <Image
          width={400}
          src={image}
          layout='intrinsic'
          objectFit='contain'
          height={Math.trunc(400 / ratio)}
          alt={todoState?.title}
          onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
        />
      ) : (
        <Skeleton
          width={250}
          height={250 / ratio}
          baseColor='#11111a'
          highlightColor='#191933'
          enableAnimation={true}
          className='mx-auto lh-lg'
        />
      )}
    </div>
  );
}

export default ImageContainer;
