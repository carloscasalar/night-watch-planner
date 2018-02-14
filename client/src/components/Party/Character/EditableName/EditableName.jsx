import React, {Component} from 'react';
import './EditableName.less';

class EditableName extends Component {
    state = {
        edit: false,
        name: this.props.nameText
    };

    changeNameHandler = (event) => this.setState({
        name: event.target.value
    });

    switchEditHandler = (event) => {
        this.setState((previousState) => {
            const edit = !previousState.edit;
            if (!edit) {
                this.props.updateName(previousState.name);
            }

            return {edit};
        });
    };

    submitNameHandler = event => {
        if (event.charCode === 13) {
            this.switchEditHandler(event);
        }
    };

    render() {
        return (
            <div className="EditableName">
                {this.state.edit ?
                    <input type="text"
                           value={this.state.name}
                           onChange={this.changeNameHandler}
                           autoCapitalize="true"
                           autoFocus="true"
                           onBlur={this.switchEditHandler}
                           onKeyPressCapture={this.submitNameHandler}
                    />
                    : <span onClick={this.switchEditHandler}>{this.props.nameText}</span>}
            </div>
        );
    }
}

export default EditableName;