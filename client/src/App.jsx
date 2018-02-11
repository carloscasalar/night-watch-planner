import React, {Component} from 'react';
import './App.less';
import Layout from './components/Layout/Layout';
import PartyBuilder from './containers/PartyBuilder/PartyBuilder';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Layout >
                    <PartyBuilder/>
                </Layout>
            </div>
        );

    }
}

export default App;