import React, { Component } from 'react';
import './PartyControls.less';
import { NO_ERROR, nameError } from '../validators/nameValidators';

const NO_NAME = '';

class PartyControls extends Component {
  state = {
    name: NO_NAME,
  };

  setName = (name) => {
    this.setState({ name });
  };

  nameErrors = name => nameError(this.props.forbiddenNames, name);

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
