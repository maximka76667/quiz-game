import React from 'react';
import PropTypes from 'prop-types';

interface QuestionInterface {
  q: string,
  a: string
}

interface QuestionProps {
  question: QuestionInterface;
}

function Question(props: QuestionProps) {
  const { question } = props;
  return (
    <div className="question">
      <p>{question.q}</p>
      <p>{question.a}</p>
    </div>
  );
}

Question.propType = {
  question: PropTypes.shape({
    q: PropTypes.string,
    a: PropTypes.string,
  }).isRequired,
};

export default Question;
