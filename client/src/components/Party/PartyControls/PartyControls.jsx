import React, { Component } from 'react';
import './PartyControls.less';

class PartyControls extends Component {
    state = {
      name: '',
    };

    setName = name => this.setState({ name });

    cleanName = () => this.setState({ name: '' });

    render() {
      return (
        <div className="PartyControls">
          <label htmlFor="newCharacterName">Name:</label>
          <input
            id="newCharacterName"
            type="text"
            value={this.state.name}
            onChange={event => this.setName(event.target.value)}
            autoCapitalize="true"
          />
          <button
            className="addCharacter"
            title="Add character"
            onClick={() => {
                            this.props.addCharacter(this.state.name);
                            this.cleanName();
                        }}
          >+
          </button>
        </div>
      );
    }
}

export default PartyControls;
