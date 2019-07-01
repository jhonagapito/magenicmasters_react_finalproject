import { GET_TYPES} from "../actions/constants";

export default function(state = null, action) {
    switch(action.type) {
        case GET_TYPES:
            return action.payload;
        default:
              return state;
    }
}
