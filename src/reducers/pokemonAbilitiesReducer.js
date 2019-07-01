import { GET_ABILITIES} from "../actions/constants";

export default function(state = null, action) {
    switch(action.type) {
        case GET_ABILITIES:
            return action.payload;
        default:
              return state;
    }
}
