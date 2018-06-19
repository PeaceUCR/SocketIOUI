/**
 * Created by hea on 3/30/18.
 */

import {combineReducers} from 'redux'
import UserReducer from './UserReducer'
import ErrorMsgReducer from './ErrorMsgReducer'
import MessageReducer from './MessageReducer'
import RoomUserReducer from  './RoomUserReducer'
import NewsReducer from './NewsReducer'
import { routerReducer } from 'react-router-redux'

const appReducer = combineReducers({
    user: UserReducer,
    roomuser: RoomUserReducer,
    error: ErrorMsgReducer,
    message: MessageReducer,
    news: NewsReducer,
    router: routerReducer
});

export default appReducer;