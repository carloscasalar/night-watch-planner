import React, { Component } from 'react';
import './PartyControls.less';

const DUPLICATED_NAME = 'There is already a character with this name.';
const NO_ERROR = '';
const NO_NAME = '';

class PartyControls extends Component {
  state = {
    name: NO_NAME,
  };

  setName = (name) => {
    this.setState({ name });
  };

  nameErrors = (name) => {
    const { forbiddenNames } = this.props;
    return forbiddenNames.includes(name) ? DUPLICATED_NAME : NO_ERROR;
  };

  cleanName = () => this.setState({
    name: NO_NAME,
  });

  render() {
    const { addCharacter } = this.props;
    const { name } = this.state;

    const errors = this.nameErrors(name);

    return (
      <div className="PartyControls">
        <label htmlFor="newCharacterName">Name:
          <input
            id="newCharacterName"
            type="text"
            className="name"
            value={name}
            onChange={({ target: { value } }) => this.setName(value)}
          />
        </label>
        <button
          className="addCharacter"
          title="Add character"
          disabled={errors !== NO_ERROR || name === NO_NAME}
          onClick={() => {
            addCharacter(name);
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
