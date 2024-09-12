'use client'
import { useSearchParams } from 'next/navigation';
import styles from './Results.module.scss';  // Import the SCSS module

const Results = () => {
  const searchParams = useSearchParams();
  const correct = searchParams.get('correct');
  const incorrect = searchParams.get('incorrect');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trivia Results</h1>
      <div className={styles.card}>
        <p className={styles.text}>Total Questions Served: 10</p>
        <p className={styles.text}>Total Correct Questions: {correct}</p>
        <p className={styles.text}>Total Incorrect Questions: {incorrect}</p>
      </div>
      <div className={styles.score}>
        <p>Your Score: {correct}/10</p>
      </div>
    </div>
  );
};

export default Results;
