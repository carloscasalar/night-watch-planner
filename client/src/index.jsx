import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.less';
import App from './App';
import reducer from './store/reducer';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

// Hot Module Replacement
// Enable Webpack hot module replacement for reducers
if (module.hot) {
  module.hot.accept('./store/reducer', () => {
    store.replaceReducer(reducer);
  });
}
