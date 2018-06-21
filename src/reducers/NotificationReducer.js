/**
 * Created by hea on 6/20/18.
 */



const initialState = [];
//set current error
function NotificationReducer(preState = initialState, action) {
    switch (action.type) {
        case "addNotification":
            return [...preState,action.payload];
        case "setNotification":
            return action.payload;
        default:
            return preState;
    }
}

export default NotificationReducer;