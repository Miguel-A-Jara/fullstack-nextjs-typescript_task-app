import styles from '../../styles/Card/card.module.css';

const EmptyCardList = () => {
  return (
    <div className={`${styles['card-empty']} app-shadow`}>
      <h2 className='display-3 fw-bold'>Sorry, but no todos to show here!</h2>
    </div>
  )
}

export default EmptyCardList
