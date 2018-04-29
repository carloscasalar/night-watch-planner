import React, { Component } from 'react';
import './EditableName.less';
import { NO_ERROR, nameError } from '../../validators/nameValidators';

class EditableName extends Component {
    state = {
      edit: false,
      name: this.props.name,
      error: NO_ERROR,
    };

    nameError = name => nameError(this.props.forbiddenNames, name);

    changeNameHandler = ({ target: { value: name } }) => this.setState({
      name,
      error: this.nameError(name),
    });

    discardChangesState = () => ({
      name: this.props.name,
      error: NO_ERROR,
    });

    switchEditHandler = () => {
      this.setState((previousState) => {
        const edit = !previousState.edit;
        let newState = { edit };
        if (!edit) {
          if (this.state.error === NO_ERROR) {
            this.props.updateName(previousState.name);
          } else {
            newState = { edit, ...this.discardChangesState()};
          }
        }

        return newState;
      });
    };

    submitNameHandler = (event) => {
      if (event.charCode === 13) {
        this.switchEditHandler(event);
      }
    };

    render() {
      return (
        <div className="EditableName">
          {this.state.edit ?
            <input
              type="text"
              value={this.state.name}
              onChange={this.changeNameHandler}
              autoCapitalize="true"
              autoFocus="true"
              onBlur={this.switchEditHandler}
              onKeyPressCapture={this.submitNameHandler}
            />
            : <button className="textButton" onClick={this.switchEditHandler}>{this.props.name}</button>}

          <div className="errorContainer">
            <span className="error">{this.state.error}</span>
          </div>
        </div>
      );
    }
}

export default EditableName;
