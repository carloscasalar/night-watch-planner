import React, {Component} from 'react';
import logo from '../public/logo.svg';
import './App.less';

class App extends Component {
    render() {
        return (
            <div className="App">
                <img className="App-Logo" src={logo} alt="React Logo"/>
                <h1 className="App-Title">Night Watch Planner</h1>
            </div>
        );

    }
}

export default App;