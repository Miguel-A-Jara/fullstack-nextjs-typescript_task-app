import React from 'react'
import styles from '../../styles/Input/PriorityInput.module.css';

interface IPriorityInputThumbProps {
  value: number;
}

const PriorityInputThumb = ({ value }: IPriorityInputThumbProps) => {
  return (
    <i
      className={`bi ${styles['thumb-icon']}
        ${value === 1 ? `one   bi-emoji-wink-fill` : ''}
        ${value === 2 ? `two   bi-emoji-smile-upside-down-fill` : ''}
        ${value === 3 ? `three bi-emoji-expressionless-fill` : ''}
        ${value === 4 ? `four  bi-emoji-angry-fill` : ''}
        ${value === 5 ? `five  bi-emoji-dizzy-fill` : ''}
      `}
    />
  )
}

export default PriorityInputThumb
