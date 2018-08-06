/**
 * Created by hea on 6/20/18.
 */

import createHistory from 'history/createBrowserHistory';
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

 const enhancers = compose(
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
 const store = createStore(appReducer, compose(applyMiddleware(thunk, rmiddleware),enhancers));


//const store = createStore(appReducer, applyMiddleware(thunk, rmiddleware));

store.history = history;

export default store;
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))