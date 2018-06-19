/**
 * Created by hea on 6/4/18.
 */

const initialState = null;
//set current error
function ErrorMsgReducer(preState = initialState, action) {
    switch (action.type) {
        case "setError":
            console.log(action.payload);
            return action.payload;
        default:
            return preState;
    }
}

export default ErrorMsgReducer;