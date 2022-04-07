import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  nextQuestion = () => {
    this.setState((prev) => ({
      index: prev.index + 1,
    }));
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;

    return (
      <>
        <Header />
        <Question nextQuestion={ this.nextQuestion } question={ questions[index] } />
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({ questions: player.questions });

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Game);
