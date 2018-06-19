/**
 * Created by hea on 6/13/18.
 */

const initialState = {
};
//https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
function NewsReducer(preState = initialState, action) {
    let newState;
    switch (action.type) {
        case "setNewsContent":
            newState = {
                content: action.payload,
                country: preState.country,
                category: preState.category
            };
            return newState;
        case "setNewsCountry":
            newState = {
                content: preState.content,
                country: action.payload,
                category: preState.category
            };
            return newState;
        case "setNewsCategory":
            newState = {
                content: preState.content,
                country: preState.country,
                category: action.payload
            };
            return newState;
        default:
            return preState;
    }
}

export default NewsReducer;