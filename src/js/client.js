import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { Router, hashHistory } from 'react-router';

import reducers from './reducers';
import routes from './routes';

const createStoreWithMiddle = applyMiddleware(ReduxThunk, ReduxPromise)(createStore);

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={createStoreWithMiddle(reducers)}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
  , app
);
