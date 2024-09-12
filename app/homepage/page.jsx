'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [questionData, setQuestionData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    setFetching(true);
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=1');
      const data = response.data.results[0];
      setQuestionData({
        question: data.question,
        correctAnswer: data.correct_answer,
        options: [...data.incorrect_answers, data.correct_answer].sort(),
      });
      setCorrectAnswer(data.correct_answer);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setErrorMessage(''); // Clear error message on new question
    } catch (error) {
      console.error('Error fetching question', error);
    }
    setLoading(false);
    setFetching(false);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      if (selectedAnswer === correctAnswer) {
        setIsCorrect(true);
        setScore({ ...score, correct: score.correct + 1 });
      } else {
        setIsCorrect(false);
        setScore({ ...score, incorrect: score.incorrect + 1 });
      }
      setIsSubmitted(true); // Disable option selection after submit
      setErrorMessage(''); // Clear any previous error message
    } else {
      setErrorMessage('Please select at least one answer'); // Show error message if no answer is selected
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < 10) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      fetchQuestion();
      setIsSubmitted(false); // Enable option selection for the next question
      setIsCorrect(null); // Reset isCorrect state
    } else {
      router.push(`/results?correct=${score.correct}&incorrect=${score.incorrect}`);
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
console.log(errorMessage,'errorMessage');
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trivia Game</h1>
      {fetching ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.card}>
          <div className={styles.questionContainer}>
            <h3 dangerouslySetInnerHTML={{ __html: questionData?.question }} className={styles.question} />
            <p className={styles.questionNumber}>Question {currentQuestionIndex + 1} of 10</p>
          </div>
          <div className={styles.options}>
            {questionData?.options.map((option, index) => (
              <label
                key={index}
                className={`${styles.option} ${isSubmitted ? styles.disabled : ''}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className={styles.radio}
                  disabled={isSubmitted} // Disable input if answer is submitted
                />
                <span className={styles.optionLabel}>
                  {optionLabels[index]}
                </span>
                <span dangerouslySetInnerHTML={{ __html: option }} />
              </label>
            ))}
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Display error message */}
          <button onClick={handleSubmit} className={styles.button}>
            Submit
          </button>

          {isCorrect !== null && (
            <div className={styles.result}>
              <p>{isCorrect ? 'Correct!' : `Wrong! The correct answer is: ${correctAnswer}`}</p>
              <button onClick={handleNextQuestion} className={styles.button}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
