import { GET_POKEMON_NATURES } from "../actions/constants";

export default function(state = null, action) {
    switch(action.type) {
        case GET_POKEMON_NATURES:
            return action.payload;
        default:
              return state;
    }
}
