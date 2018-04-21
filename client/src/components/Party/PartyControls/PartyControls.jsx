import React, { Component } from 'react';
import './PartyControls.less';

class PartyControls extends Component {
  state = {
    name: '',
    errors: [],
  };

  setName = (name) => {
    let errors = [];
    if (!this.isValid(name)) {
      errors = ['Name too large'];
    }
    this.setState({ name, errors });
  };

  cleanName = () => this.setState({
    name: '',
    errors: [],
  });

  isValid = name => (name && name.length < 5);

  render() {
    const { addCharacter } = this.props;

    const { errors } = this.state;

    const errorContainer = (
      <div className="errorContainer">
        {errors.map(error => (<span key={error} className="error">{error}</span>))}
      </div>
    );

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
          disabled={errors.length > 0}
          onClick={() => {
            addCharacter(this.state.name);
            this.cleanName();
          }}
        >+
        </button>
        {errorContainer}
      </div>
    );
  }
}

export default PartyControls;
