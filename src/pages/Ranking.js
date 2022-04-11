import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetUserAction } from '../redux/actions/userActions';

class Ranking extends Component {
  handleClick = () => {
    const { resetQuestion, history } = this.props;
    resetQuestion();
    history.push('/');
  }

  render() {
    const { ranking } = this.props;
    const rankingPlayers = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingPlayers.map((player, index) => (
          <div
            key={ index }
          >
            <h4
              data-testid={ `player-name-${index}` }
            >
              {player.name}
            </h4>
            <p
              data-testid={ `player-score-${index}` }
            >
              {player.score}
            </p>
          </div>
        ))}
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          Home
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetQuestion: () => dispatch(resetUserAction()),
});

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

Ranking.propTypes = {
  resetQuestion: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func }),
  ranking: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
