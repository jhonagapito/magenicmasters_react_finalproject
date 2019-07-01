import { GET_POKEMON_LIST, GET_POKEMON, BASIC_SEARCH, ADVANCED_SEARCH , GET_TYPES, RESET, SORT_POKEMON} from "../actions/constants";

export default function(state = null, action) {
    switch(action.type) {
        case GET_POKEMON_LIST:
            return action.payload;
        case RESET:
            return action.payload;
        case BASIC_SEARCH:
                return state.filter(pokemon => {
                      return pokemon.name.toLowerCase().includes(action.payload.toLowerCase());  
                });
        case ADVANCED_SEARCH:
            if(action.payload.selectedTypes.length > 0 && action.payload.selectedAbility != "")
            {
                return state.filter(pokemon => {
                    const abilities = pokemon.abilities.map(a => a.ability.name);
                     return  ((action.payload.selectedTypes.includes(pokemon.type1) || action.payload.selectedTypes.includes(pokemon.type2))
                        && (abilities.includes(action.payload.selectedAbility))
                        && pokemon.name.toLowerCase().includes(action.payload.searchText.toLowerCase())
                     );
                });
            }
            if(action.payload.selectedTypes.length > 0)
            {
                return state.filter(pokemon => {
                     return ((action.payload.selectedTypes.includes(pokemon.type1) || action.payload.selectedTypes.includes(pokemon.type2))
                        && pokemon.name.toLowerCase().includes(action.payload.searchText.toLowerCase()));
                });
            }
            if(action.payload.selectedAbility != "") {
                return state.filter(pokemon => {
                     const abilities = pokemon.abilities.map(a => a.ability.name);
                     return  (abilities.includes(action.payload.selectedAbility))
                        && pokemon.name.toLowerCase().includes(action.payload.searchText.toLowerCase());
                        });
            }
            return state.filter(pokemon => {
                  return pokemon.name.toLowerCase().includes(action.payload.searchText.toLowerCase());  
            });
        case SORT_POKEMON:
            switch(parseInt(action.payload))
            {
                // id asc
                case 0: return state.concat().sort((a, b) => { return a.id - b.id;});
                //id desc
                case 1: return state.concat().sort((a, b) => { return a.id - b.id;}).reverse();
                //name asc
                case 2: return state.concat().sort((a, b) => { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;});
                //name desc
                case 3: return state.concat().sort((a, b) => { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;}).reverse();
                default: return state;
            }
        default:
              return state;
    }
}
