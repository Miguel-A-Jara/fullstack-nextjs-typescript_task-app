import styles from '../../styles/loading/loadingCircle.module.css';

interface ILoadingCircleProps {
  size: number;
}

const LoadingCircle = ({ size }: ILoadingCircleProps) => {
  return (
    <div style={{ width: size, height: size }} className={styles.circle} >
      
    </div>
  )
}

export default LoadingCircle
