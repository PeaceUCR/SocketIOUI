import React from 'react';
import ReactDOM from 'react-dom';

import Gate from './components/Gate';
import HomePage from './containers/HomePage';
import UserPage from './containers/UserPage';

import RoomPage from  './containers/RoomPage';
//import registerServiceWorker from './registerServiceWorker';
import './all.css';

import createHistory from 'history/createBrowserHistory';
import { Route} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {ConnectedRouter, routerMiddleware, push} from 'react-router-redux'
import appReducer from './reducers/index';
import thunk from 'redux-thunk';


//https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const rmiddleware = routerMiddleware(history);

// for chrome debug extension
//https://stackoverflow.com/questions/37526621/no-store-found-when-using-redux-chrome-extension
/*
const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(appReducer, compose(applyMiddleware(thunk, rmiddleware),enhancers));
*/
const store = createStore(appReducer, applyMiddleware(thunk, rmiddleware));
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))


//react router not working after build put in server
// //https://stackoverflow.com/questions/43411635/react-router-not-working-when-deployed
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div >
                <Route  exact={true} path="/" component={HomePage} />
                <Route  exact={true} path="/gate" component={Gate} />
                <Route  path="/room/:roomname" component={RoomPage} />
                <Route  path="/user/:id" component={UserPage} />
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

//registerService will affect the server routing
//registerServiceWorker();
