/**
 * Created by hea on 6/20/18.
 */


const initialState = {};
//set current error
function socketStatusReducer(preState = initialState, action) {
    switch (action.type) {
        case "updateSocketStatus":
            return action.payload;
        default:
            return preState;
    }
}

export default socketStatusReducer;