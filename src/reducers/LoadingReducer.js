/**
 * Created by hea on 8/6/18.
 */

const initialState = false;
//set loading status to
function LoadingReducer(preState = initialState, action) {
    switch (action.type) {
        case "startLoading":
            return action.payload;
        case "stopLoading":
            return action.payload;
        default:
            return preState;
    }
}

export default LoadingReducer;