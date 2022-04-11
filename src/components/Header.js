import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { player: { name, score, gravatarEmail } } = this.props;

    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="Avatar" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.shape(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps)(Header);
