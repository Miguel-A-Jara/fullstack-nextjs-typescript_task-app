import React from 'react'
import styles from '../../styles/Input/PriorityInput.module.css';

interface IPriorityInputThumbProps {
  value: number;
}

const PriorityInputThumb = ({ value }: IPriorityInputThumbProps) => {
  return (
    <i
      className={`bi ${styles['thumb-icon']}
        ${value === 1 ? `${styles.one  } bi-emoji-wink-fill` : ''}
        ${value === 2 ? `${styles.two  } bi-emoji-smile-upside-down-fill` : ''}
        ${value === 3 ? `${styles.three} bi-emoji-expressionless-fill` : ''}
        ${value === 4 ? `${styles.four } bi-emoji-angry-fill` : ''}
        ${value === 5 ? `${styles.five } bi-emoji-dizzy-fill` : ''}
      `}
    />
  )
}

export default PriorityInputThumb
