import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

let createWithMiddleware = applyMiddleware(thunk, createLogger())(createStore)
let store = createWithMiddleware(reducers);

import Game from './game';

ReactDom.render((
    <Provider store={store}>
        <Game />
    </Provider>
), document.getElementById('content'));