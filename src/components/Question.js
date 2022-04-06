import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: this.shuffleAnswers(),
    };
  }

  shuffleAnswers = () => {
    const { question } = this.props;

    const result = [];
    const answers = [...question.incorrect_answers, question.correct_answer];
    let incorrectIndex = 0;

    const { length } = answers;
    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * answers.length + 0);
      const [selectedItem] = answers.splice(randomIndex, 1);

      if (selectedItem === question.correct_answer) { // Caso resposta esteja correta
        result.push({
          value: selectedItem,
          correct: true,
        });
      } else { // Caso resposta esteja incorreta
        result.push({
          value: selectedItem,
          correct: false,
          index: incorrectIndex,
        });
        incorrectIndex += 1;
      }
    }

    return result;
  }

  render() {
    const { question } = this.props;
    const { answers } = this.state;

    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>

        <div data-testid="answer-options">
          { answers.map((answer) => (
            <button
              type="button"
              key={ answer.value }
              data-testid={ answer.correct
                ? 'correct-answer'
                : `wrong-answer-${answer.index}` }
            >
              { answer.value }
            </button>
          ))}
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = () => ({});

Question.propTypes = {
  question: PropTypes.shape(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Question);
