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
import {ConnectedRouter, routerMiddleware, push} from 'react-router-redux'
import store from './store';


//react router not working after build put in server
// //https://stackoverflow.com/questions/43411635/react-router-not-working-when-deployed
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={store.history}>
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
