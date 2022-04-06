import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

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
    return (
      <main>
        <Header />
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
});

Feedback.propTypes = {
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
