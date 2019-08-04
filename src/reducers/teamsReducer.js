import { ADD_TEAM, GET_TEAM_NAMES } from "../actions/constants";

export default function(state = [], action) {
    switch(action.type) {
        case ADD_TEAM:
            if(!state) {
                let newArray = [];
                return newArray.concat(action.payload);
            }
            console.log('TEAM NAME ADDED');
            return state.concat(action.payload);
        case GET_TEAM_NAMES:
                if(!state) {
                    return [];
                }
                console.log(state);
                return state;
        default:
              return state;
    }
}
