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

  useEffect(() => {
    setQuestions(getQuestions);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="game">
        {
          questions.map((question, index) => (
            // eslint-disable-next-line
            <Question key={index} question={question} />
          ))
        }
      </main>
    </div>
  );
}

export default App;
