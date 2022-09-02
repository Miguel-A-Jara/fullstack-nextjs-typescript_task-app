import styles from '../../styles/Input/PriorityInput.module.css';

interface IPriorityNumbersProps {
  priority: number;
}

const PriorityNumbers = ({ priority }: IPriorityNumbersProps) => {

  const priorityNumber: number[] = [];

  for (let i = 0; i < priority; i++) {
    priorityNumber.push(i);
  }

  return (
    <div className='mt-3'>
      {
        priorityNumber.map(p => (
          <i 
            key={p} 
            className={`bi bi-alarm mx-1`}
          />
        ))
      }
    </div>
  );
}

export default PriorityNumbers
