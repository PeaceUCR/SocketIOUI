/**
 * Created by hea on 4/1/18.
 */

const initialState = null;

function UserReducer(preState = initialState, action) {
    switch (action.type) {
        case "setUser":
            console.log(action.payload);
            return action.payload;
        case "logOut":
            return null;
        default:
            return preState;
    }
}

export default UserReducer;