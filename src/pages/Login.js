import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import loginAction from '../redux/actions/userActions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      SaveButtonDisabled: true,
      setName: false,
      setEmail: false,
    };
  }

  handleClick = () => {
    const { email, name } = this.state;
    const { login } = this.props;
    login(email, name);
  }

  validadeName = () => {
    const { name } = this.state;

    if (name.length > 0) {
      this.setState({
        setName: true,
      }, this.validadeButton);
    }
    // const { setName } = this.state;
    // console.log(setName);
  }

  validadeEmail = () => {
    const { email } = this.state;
    console.log(email);
    const regexEmailTest = /\S+@\S+\.\S+/;
    const isValidEmail = regexEmailTest.test(email);
    if (isValidEmail) {
      this.setState({
        setEmail: true,
      }, this.validadeButton);
    }
  }

  validadeButton = () => {
    const { setName, setEmail } = this.state;

    if ((setName && setEmail) === true) {
      this.setState({
        SaveButtonDisabled: false,
      });
    }
  }

  handleChangeName = ({ target }) => {
    this.setState({
      name: target.value,
    }, this.validadeName);
  }

  handleChangeEmail = ({ target }) => {
    this.setState({
      email: target.value,
    }, this.validadeEmail);
  }

  render() {
    const { SaveButtonDisabled, name, email } = this.state;
    const { history, questions } = this.props;

    if (questions.length) return <Redirect push to="/game" />;
    return (
      <div>
        <form>
          <input
            data-testid="input-player-name"
            type="text"
            value={ name }
            onChange={ this.handleChangeName }
            placeholder="Nome do Jogador"
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            value={ email }
            onChange={ this.handleChangeEmail }
            placeholder="Email"
          />
          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClick }
            disabled={ SaveButtonDisabled }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.player.questions,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, name) => dispatch(loginAction(email, name)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
