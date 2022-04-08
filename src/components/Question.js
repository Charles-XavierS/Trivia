import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correctAnswerAction } from '../redux/actions/userActions';

const ONE_SECOND = 1000;
class Question extends Component {
  constructor(props) {
    super(props);

    this.timer = setInterval(this.reduceTimer, ONE_SECOND);

    this.state = {
      answers: this.shuffleAnswers(),
      wasClicked: false,
      timer: 30,
    };
  }

  startTimer = () => {
    this.timer = setInterval(this.reduceTimer, ONE_SECOND);
  }

  stopTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
  }

  reduceTimer = () => {
    this.setState((prev) => {
      if (prev.timer === 0) {
        this.stopTimer();
        this.handleAnswer({});
        return prev;
      }

      return {
        timer: prev.timer - 1,
      };
    });
  };

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

  handleAnswer = ({ target }) => {
    const { correctAnswer, question } = this.props;
    const { timer } = this.state;
    this.setState({ wasClicked: true });
    this.stopTimer();

    const answer = target?.dataset.testid;
    console.log(answer);

    if (answer === 'correct-answer') {
      correctAnswer(question.difficulty, timer);
    }
  }

  handleNext = () => {
    const { nextQuestion } = this.props;

    this.setState({ wasClicked: false, timer: 30 });
    this.startTimer();
    nextQuestion();
  }

  render() {
    const { question } = this.props;
    const { answers, wasClicked, timer } = this.state;

    return (
      <div>
        <p>
          Timer:
          {' '}
          { timer }
        </p>

        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>

        <div
          data-testid="answer-options"
          className={
            wasClicked
              ? 'answer_container'
              : undefined
          }
        >
          { answers.map((answer) => (
            <button
              type="button"
              className={ answer.correct ? 'correct' : 'wrong' }
              key={ answer.value }
              disabled={ wasClicked }
              data-testid={ answer.correct
                ? 'correct-answer'
                : `wrong-answer-${answer.index}` }
              onClick={ this.handleAnswer }
            >
              { answer.value }
            </button>
          ))}
        </div>

        { wasClicked && (
          <button
            type="button"
            onClick={ this.handleNext }
            data-testid="btn-next"
          >
            Next
          </button>
        ) }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  correctAnswer: (difficulty, timer) => dispatch(correctAnswerAction(difficulty, timer)),
});

Question.propTypes = {
  question: PropTypes.shape(PropTypes.any),
  nextQuestion: PropTypes.func.isRequired,
  correctAnswer: PropTypes.func.isRequired,
}.isRequired;

export default connect(null, mapDispatchToProps)(Question);
