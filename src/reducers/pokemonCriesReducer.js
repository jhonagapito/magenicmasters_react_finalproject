import { GET_CRY } from "../actions/constants";

export default function(state = null, action) {
    switch(action.type) {
        case GET_CRY:
            return action.payload;
        default:
              return state;
    }
}
