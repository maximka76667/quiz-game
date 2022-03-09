import Header from 'components/Header/Header';
import Question from 'components/Question/Question';
import React, { useEffect, useState } from 'react';
import getQuestions from 'utils/api';
import './App.sass';

function App() {
  interface QuestionInterface {
    q: string,
    a: string
  }

  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [question, setQuestion] = useState<QuestionInterface>({ q: '', a: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [response, setResponse] = useState('');
  const [result, setResult] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (userAnswer === answer) {
      setIsCorrect(true);
      setCorrectCount(correctCount + 1);
      setResponse('Правильно');
      setTimeout(() => {
        setIsCorrect(false);
        setUserAnswer('');
        setResponse('');
      }, 1000);
    } else {
      setIsCorrect(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserAnswer(e.target.value);
    handleSubmit(e);
  }

  function generateNumber() {
    return Math.floor(questions.length * Math.random());
  }

  const changeQuestion = () => {
    console.log('Вопрос изменен');
    setTimeout(() => {
      setQuestion(questions[generateNumber()]);
    }, 1000);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (userAnswer !== answer) {
        setIncorrectCount(incorrectCount + 1);
        setResponse(answer);
        setTimeout(() => {
          changeQuestion();
          setResponse('');
        }, 1000);
      }
    }
  }

  function handleSkipTask() {
    changeQuestion();
    setIncorrectCount(incorrectCount + 1);
    setResponse(answer);
    changeQuestion();
    setTimeout(() => {
      setResponse('');
    }, 1000);
  }

  useEffect(() => {
    setQuestions(getQuestions);
    changeQuestion();
    console.log('Сгенерирован...');
    setAnswer(question.a);
  }, []);

  useEffect(() => {
    if (isCorrect) {
      changeQuestion();
    }
  }, [isCorrect]);

  useEffect(() => {
    if (incorrectCount >= 3 && correctCount < 3) {
      window.location.href = '/quiz/#/game/result';
      setCorrectCount(0);
      setIncorrectCount(0);
      setResult(false);
    } else if (correctCount >= 3 && incorrectCount < 3) {
      window.location.href = '/quiz/#/game/result';
      setCorrectCount(0);
      setIncorrectCount(0);
      setResult(true);
    }
  }, [incorrectCount, correctCount]);

  return (
    <div className="app">
      <Header />
      <main className="game">
        <Question question={question} isCorrect={isCorrect} />
        <p className="question__response">{response}</p>
        <form className="question__form" onSubmit={handleSubmit}>
          <input className={`question__input ${isCorrect ? 'question__input_correct' : ''}`} type="text" placeholder="Ответ" onChange={handleChange} onKeyDown={handleKeyDown} value={userAnswer} />
        </form>
        <p className="question__correct-count">
          Правильных ответов:
          {' '}
          <span>{correctCount}</span>
        </p>
        <p className="question__incorrect-count">
          Неправильных ответов:
          {' '}
          <span>{incorrectCount}</span>
        </p>
        <button type="submit" className="question__skip" onClick={handleSkipTask}>Пропустить</button>
        {result}
      </main>
    </div>
  );
}

export default App;
