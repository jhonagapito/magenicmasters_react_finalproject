import { GET_POKEMON_LIST, GET_POKEMON, BASIC_SEARCH, ADVANCED_SEARCH , GET_TYPES, RESET, SORT_POKEMON} from "../actions/constants";

export default function(state = null, action) {
    switch(action.type) {
        case GET_POKEMON:
            return action.payload;
        default:
              return state;
    }
}
