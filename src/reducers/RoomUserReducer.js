/**
 * Created by hea on 6/6/18.
 */

const initialState = [];

function RoomUserReducer(preState = initialState, action) {
    switch (action.type) {
        case "setRoomUser":
            console.log(action.payload);
            return action.payload;
        default:
            return preState;
    }
}

export default RoomUserReducer;