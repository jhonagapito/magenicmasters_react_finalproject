import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers/index';
import './fontAwesomeRegistry';

import AppRouter from './AppRouter';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import NewItem from './components/newItem';
import Layout from './components/Common/Layout';

let createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
let storeWithMiddleware = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
    <Provider store={storeWithMiddleware}>
        <AppRouter />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
