/**
 * Created by hea on 3/30/18.
 */

import {combineReducers} from 'redux'

import ErrorMsgReducer from './ErrorMsgReducer'
import URLReducer from './URLReducer'
import LoadingReducer from './LoadingReducer'

const appReducer = combineReducers({
    urls: URLReducer,
    loading: LoadingReducer,
    error: ErrorMsgReducer
});

export default appReducer;