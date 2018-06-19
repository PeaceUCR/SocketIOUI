/**
 * Created by hea on 6/6/18.
 */


const initialState = {};
//set current error
function MessageReducer(preState = initialState, action) {
    switch (action.type) {
        case "addMessage":
            console.log(action.payload);
            //we must copy the previous state, otherwise update on prestate will not rerender
            let newState =JSON.parse(JSON.stringify(preState));
            if(newState[action.payload.room]){
            }else {
                newState[action.payload.room] =[];
            }
            newState[action.payload.room].push(action.payload);
            return newState;
        default:
            return preState;
    }
}

export default MessageReducer;