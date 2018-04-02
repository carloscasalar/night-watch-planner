import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.less';
import App from './App';
import reducer from './store/reducer';

const store = createStore(reducer);

ReactDOM.render(<Provider store={ store } ><App /></Provider>, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}
