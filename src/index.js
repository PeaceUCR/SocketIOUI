import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './containers/HomePage';
import LoadingSpinner from './components/LoadingSpinner'

import registerServiceWorker from './registerServiceWorker';
import './all.css';
import createHistory from 'history/createBrowserHistory';
import { Route} from 'react-router';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware, push} from 'react-router-redux'
import store from './store';


//react router not working after build put in server
// //https://stackoverflow.com/questions/43411635/react-router-not-working-when-deployed
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={store.history}>
            <div >
                <Route  path="/" component={LoadingSpinner} />
                <Route  path="/" component={HomePage} />
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

//registerService will affect the server routing
registerServiceWorker();
