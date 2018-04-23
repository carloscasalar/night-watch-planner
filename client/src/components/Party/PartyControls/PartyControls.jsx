import React, { Component } from 'react';
import './PartyControls.less';

const DUPLICATED_NAME = 'There is already a character with this name.';
const NO_ERROR = '';
const NO_NAME = '';

class PartyControls extends Component {
  state = {
    name: NO_NAME,
    errors: NO_ERROR,
  };

  setName = (name) => {
    const errors = this.nameErrors(name);
    this.setState({ name, errors });
  };

  nameErrors = (name) => {
    const { forbiddenNames } = this.props;
    return forbiddenNames.includes(name) ? DUPLICATED_NAME : NO_ERROR;
  };

  cleanName = () => this.setState({
    name: NO_NAME,
    errors: NO_ERROR,
  });

  render() {
    const { addCharacter } = this.props;

    const { errors } = this.state;

    return (
      <div className="PartyControls">
        <label htmlFor="newCharacterName">Name:
          <input
            id="newCharacterName"
            type="text"
            className="name"
            value={this.state.name}
            onChange={event => this.setName(event.target.value)}
          />
        </label>
        <button
          className="addCharacter"
          title="Add character"
          disabled={errors !== NO_ERROR || this.state.name === NO_NAME}
          onClick={() => {
            addCharacter(this.state.name);
            this.cleanName();
          }}
        >+
        </button>
        <div className="errorContainer">
          <span className="error">{errors}</span>
        </div>
      </div>
    );
  }
}

export default PartyControls;
