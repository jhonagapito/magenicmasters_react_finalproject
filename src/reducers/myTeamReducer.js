import { GET_MYTEAM, ADD_TO_MYTEAM, REMOVE_FROM_MYTEAM, SELECT_TEAM} from "../actions/constants";

export default function(state = null, action) {
    switch(action.type) {
        case GET_MYTEAM:
            if(!state) {
                return [];
            }
            return state;
        case ADD_TO_MYTEAM:
            if(!state) {
                let newArray = [];
                return newArray.concat(action.payload);
            }
            return state.concat(action.payload);
        case REMOVE_FROM_MYTEAM:
            console.log('REMOVE_FROM_MYTEAM');
            console.log(state);
            console.log(action.payload);
            return state.filter((roster) => roster.pokemon != action.payload.pokemon);
            //return action.payload;
        case SELECT_TEAM:
           return action.payload;
        default:
              return state;
    }
}
