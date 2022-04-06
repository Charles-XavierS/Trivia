import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  handleScore() {
    const { assertions } = this.props;
    let scorePhrase;
    const number = 3;
    if (assertions < number && assertions === '0') {
      scorePhrase = 'Could be better...';
    } if (assertions > number) {
      scorePhrase = 'Well Done!';
    } if (assertions === '') {
      scorePhrase = '';
    }
    return scorePhrase;
  }

  feedback() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <main>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="Avatar" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
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
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
