import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleScore() {
    const { assertions } = this.props;
    let scorePhrase;
    const number = 3;

    if (assertions < number) {
      scorePhrase = 'Could be better...';
    } else if (assertions >= number) {
      scorePhrase = 'Well Done!';
    }

    return scorePhrase;
  }

  feedback() {
    const { score, assertions } = this.props;

    return (
      <main>
        <Header />
        <span>
          Pontuação:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </span>
        <span>
          Acertos:
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </span>
        <h4 data-testid="feedback-text">{this.handleScore()}</h4>
      </main>
    );
  }

  render() {
    return (
      <>
        {this.feedback()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
