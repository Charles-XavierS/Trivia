import React, { Component } from 'react';

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
    const { setEmail } = this.state;
    console.log(setEmail);
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
    const { name } = this.state;
    console.log(name);
  }

  handleChangeEmail = ({ target }) => {
    this.setState({
      email: target.value,
    }, this.validadeEmail);
  }

  render() {
    const { SaveButtonDisabled, name, email } = this.state;
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
            // onClick={ () => {} }
            disabled={ SaveButtonDisabled }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
