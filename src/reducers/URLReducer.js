/**
 * Created by hea on 8/6/18.
 */

const initialState = [];
//set current error
function URLReducer(preState = initialState, action) {
    switch (action.type) {
        case "getURL":
            console.log(action.payload);
            return action.payload;
        default:
            return preState;
    }
}

export default URLReducer;