import { useEffect } from 'react';
import styles from '../../styles/loading/loadingScreen.module.css';
import LoadingCircle from './LoadingCircle';

const LoadingScreen = () => {

  useEffect(() => {
    const body = document.querySelector('body')!;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.container}>
      <LoadingCircle size={70} />
    </div>
  )
}

export default LoadingScreen
