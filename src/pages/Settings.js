import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import updateSettingsAction from '../redux/actions/settingsActions';
import { getCategories } from '../api/request';

const difficulties = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
};
const types = {
  'Multiple Choice': 'multiple',
  'True/False': 'boolean',
};

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleInput = ({ target }) => {
    const { updateSettings } = this.props;
    const { name, value } = target;
    updateSettings(name, value);
  }

  render() {
    const { settings: { type, difficulty, category, amount } } = this.props;
    const { categories } = this.state;

    return (
      <div data-testid="settings-title">
        <h1>Settings</h1>

        <input
          type="number"
          min="1"
          max="50"
          name="amount"
          onChange={ this.handleInput }
          value={ amount }
        />

        <select
          name="category"
          value={ category || '' }
          onChange={ this.handleInput }
        >
          { categories.length
            ? (
              <>
                <option value="">Any Category</option>
                { categories.map((item) => (
                  <option key={ item.id } value={ item.id }>{ item.name }</option>
                ))}
              </>
            ) : (
              <option value={ category || '' } disabled>Loading...</option>
            )}
        </select>

        <select
          name="difficulty"
          value={ difficulty || '' }
          onChange={ this.handleInput }
        >
          <option value="">Any Difficulty</option>
          { Object.entries(difficulties).map((item) => (
            <option key={ item[1] } value={ item[1] }>{ item[0] }</option>
          ))}
        </select>

        <select
          name="type"
          value={ type || '' }
          onChange={ this.handleInput }
        >
          <option value="">Any Type</option>
          { Object.entries(types).map((item) => (
            <option key={ item[1] } value={ item[1] }>{ item[0] }</option>
          ))}
        </select>

        <Link to="/">
          <button type="button">
            Home
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  updateSettings: (key, value) => dispatch(updateSettingsAction(key, value)),
});

Settings.propTypes = {
  settings: PropTypes.shape(PropTypes.any),
  updateSettings: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
