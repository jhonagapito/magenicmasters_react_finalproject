import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';
import pokemonDetailsReducer from './pokemonDetailsReducer';
import pokemonTypesReducer from './pokemonTypesReducer';
import pokemonCriesReducer from './pokemonCriesReducer';
import pokemonAbilitiesReducer from './pokemonAbilitiesReducer';
import myTeamReducer from './myTeamReducer';
import teamsReducer from './teamsReducer';
import pokemonNaturesReducer from './pokemonNaturesReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    teamNames: teamsReducer,
    pokemonList: pokemonReducer,
    pokemonTypes: pokemonTypesReducer,
    pokemonCry: pokemonCriesReducer,
    pokemonAbilities: pokemonAbilitiesReducer,
    pokemon: pokemonDetailsReducer,
    myTeam: myTeamReducer,
    pokemonNatures: pokemonNaturesReducer
});

export default rootReducer;

