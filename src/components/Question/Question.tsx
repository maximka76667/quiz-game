import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

interface QuestionInterface {
  q: string,
  a: string
}

interface QuestionProps {
  question: QuestionInterface;
  isCorrect: boolean
}

function Question(props: QuestionProps) {
  const { question, isCorrect } = props;

  const [thisQuestion, setThisQuestion] = useState<QuestionInterface>({ q: '', a: '' });

  useEffect(() => {
    setThisQuestion(question);
  }, []);

  return (
    <div className="question">
      <h2 className={`question__q ${isCorrect ? 'question__q_correct' : ''}`}>{thisQuestion.q}</h2>
    </div>
  );
}

Question.propType = {
  question: PropTypes.shape({
    q: PropTypes.string,
    a: PropTypes.string,
  }).isRequired,
  isCorrect: PropTypes.bool,
};

export default Question;
