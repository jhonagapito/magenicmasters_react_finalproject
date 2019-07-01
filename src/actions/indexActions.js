import {
    GET_POKEMON_LIST, GET_POKEMON, GET_POKEMON_FLAVOR_TEXT, BASIC_SEARCH, ADVANCED_SEARCH, GET_TYPES, RESET, GET_ABILITIES,
    SORT_POKEMON, ADD_TO_MYTEAM, GET_MYTEAM, REMOVE_FROM_MYTEAM, GET_CRY
} from "./constants";
import {
    GENERATION_1, POKEMON_SPECIES, POKEMON_DETAILS, POKEMON_IMAGE_NORMAL, POKEMON_IMAGE_SPRITE,
    POKEMON_TYPES, POKEMON_ABILITIES, POKEMON_MOVES, POKEMON_EVOLUTION_TRIGGER
} from "../constants/API_URLS";
import axios from 'axios';
import PokemonCries from '../data/PokemonCries';

//TODO: Create a smaller pokemon metadata store for list retrieval
let pokemonStore = [];
let evolutionStore = [];
let areAllPokemonLoaded = false;

export function basicSearch(searchText) {
    return {
        type: BASIC_SEARCH,
        payload: searchText
    };
}

export function advancedSearch(searchText, selectedAbility, selectedTypes) {
    return {
        type: ADVANCED_SEARCH,
        payload: { searchText: searchText, selectedAbility: selectedAbility, selectedTypes: selectedTypes }
    };
}

export function sort(sortOrder) {
    return {
        type: SORT_POKEMON,
        payload: sortOrder
    };
}

export function resetPokemonList(pokemonList) {
    return {
        type: RESET,
        payload: pokemonList
    };
}

export function getPokemonTypes() {
    const url = `${POKEMON_TYPES}`;

    const request = axios.get(url)
        .then(res => {

            return res.data.results;
        });

    return {
        type: GET_TYPES,
        payload: request
    };
}

export function getAbilities() {
    const url = `${POKEMON_ABILITIES}`;

    const request = axios.get(url)
        .then(res => {
            return res.data.results.sort((a, b) => { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0; });
        });

    return {
        type: GET_ABILITIES,
        payload: request
    };
}

export function getPokemonList() {
    let request = getPokemonListSubFunc();
    return {
        type: GET_POKEMON_LIST,
        payload: request
    };
}

function getPokemonListSubFunc() {
    if (areAllPokemonLoaded) {
        return new Promise(() => {
            return pokemonStore;
        });
    }

    const request = axios.get(GENERATION_1)
        .then(res => {
            pokemonStore = [...res.data.pokemon_species];
            pokemonStore.forEach((pokemon, index) => pokemon.id = getPokemonId(pokemon));
            pokemonStore.sort(idSortCompare);
            pokemonStore.forEach((pokemon, index) => getPokemonBasicInfo(pokemon, index));

            // return Promise.all(pokemonStore.map(function(pokemon){
            //     return getPokemonApiInfo(pokemon);
            //   })).then(pokemonRes => {
            //     pokemonStore[pokemonRes.index] = pokemonRes;
            //     return pokemonRes;
            //   });
            return Promise.all(pokemonStore.map(function (pokemon) {
                return getPokemonApiInfo(pokemon);
            })).then(pokemonRes => {
                pokemonStore[pokemonRes.index] = pokemonRes;

                areAllPokemonLoaded = true;

                return pokemonRes;
            });
        });

    return request;
}

export function getPokemonDetails(id) {
    let request;
    if (pokemonStore.length === 0) {
        request = getPokemonListSubFunc().then(res => {
            let pokemon = res.find(x => x.id === +id);
            return pokemon;
        });
    }
    else {
        request = pokemonStore.find(x => x.id === +id);
        // request = new Promise(() => {return pokemon;});
    }
    return {
        type: GET_POKEMON,
        payload: request
    };
}

// export function getPokemonFlavorText(id)
// {
//     let request = getPokemonFlavorText_GenerateRequest(id);

//     return {
//     type: GET_POKEMON_FLAVOR_TEXT,
//     payload: request   
//    };
// }

// function getPokemonFlavorText_GenerateRequest(id)
// {
//     const url = `${POKEMON_SPECIES}/${id}/`;

//     const request = axios.get(url)
//         .then(res => {
//             return res.data.flavor_text_entries[1].flavor_text;
//         });

//      return {
//      type: GET_POKEMON_FLAVOR_TEXT,
//      payload: request   
//     };
// }

export function getMyTeam() {
    return {
        type: GET_MYTEAM,
        payload: null
    };
}

export function removeFromMyTeam(roster) {
    return {
        type: REMOVE_FROM_MYTEAM,
        payload: roster
    };
}

export function addToMyTeam(pokemon) {
    let teamRoster = {
        pokemon: pokemon,
        moves: [null, null, null, null]
    };
    return {
        type: ADD_TO_MYTEAM,
        payload: teamRoster
    };
}

export function getPokemonCry(pokemonId) {
    let request = new Promise(() => {
        return PokemonCries[pokemonId - 1];
    });
    return {
        type: GET_CRY,
        payload: request
    };
}

function getPokemonId(pokemon) {
    return parseInt(pokemon.url.replace(POKEMON_SPECIES, '').replace('/', ''), 10);
}

function getPokemonBasicInfo(pokemon, index) {
    //Set deffault and predictable data here
    pokemon.imgUrl = "";
    pokemon.index = index;
    pokemon.type1 = "";
    pokemon.type2 = "";

    pokemon.displayId = generateDisplayId(pokemon.id);
    pokemon.imgUrl = getPokemonImageUrl(pokemon, false);
    // pokemon.cry = getPokemonCry(pokemon.id); // Resource hungry
}

function getPokemonApiInfo(pokemon, index) {
    let pokemonDetailsUrl = `${POKEMON_DETAILS}${pokemon.id}/`;

    return axios.get(pokemonDetailsUrl)
        .then(res => {
            let pokemonDetails = res.data;

            // Type
            pokemon.type2 = pokemonDetails.types[0].type.name;
            pokemon.type1 = pokemonDetails.types.length > 1 ? pokemonDetails.types[1].type.name : pokemonDetails.types[0].type.name;
            pokemon.abilities = pokemonDetails.abilities;
            pokemon.TEMP = pokemonDetails;
            pokemon.moves = pokemonDetails.moves.map(move => move.move.name);
            // pokemon.selectedMoves = [null, null, null, null];

            // Power Stats
            pokemon.powerStats = {};
            pokemonDetails.stats.forEach(stat => {
                pokemon.powerStats[stat.stat.name] = stat.base_stat;
            });

            // Physical Stats
            pokemon.physicalStats = {
                height: pokemonDetails.height / 10, //api issue pokemons are ten times their height
                heightInFeet: convertToFeet(pokemonDetails.height / 10),
                weight: pokemonDetails.weight / 10,
                weightInPounds: convertToPounds(pokemonDetails.weight / 10)
            };

            return axios.get(pokemonDetails.species.url).then(speciesRes => {
                // Description/Flavor Text
                pokemon.flavorText = speciesRes.data.flavor_text_entries.find(ft => ft.language.name == "en" && ft.version.name == "alpha-sapphire").flavor_text;

                return axios.get(speciesRes.data.evolution_chain.url).then(evolutionRes => {
                    // Evolution Info
                    pokemon.evolve_to = evolutionRes.data.chain.evolves_to.evolves_to;

                    // let evolutionInfo = {
                    //     nextEvolution: evolve_to.evolve_to
                    // };

                    // // evolutionStore
                    return pokemon;
                });
            });
        });
}

// function getPokemonSpeciesApiInfo(pokemon, index){
//     return axios.get(pokemon.species.url)
//         .then(res => {
//             let pokemonDetails = res.data;
//             pokemon.flavor_text = "TEST";

//             return pokemon;
//         });
// }

function getPokemonIdFromEvolutionChainURL(url) {
    return parseInt(url.replace(POKEMON_EVOLUTION_TRIGGER, '').replace('/', ''), 10);
}

function getPokemonImageUrl(pokemon, useSpriteImage) {
    let spriteImageType = 'png';

    if (useSpriteImage) {
        return `${POKEMON_IMAGE_SPRITE}${pokemon.id}.${spriteImageType}`;
    }
    else {
        return `${POKEMON_IMAGE_NORMAL}${pokemon.displayId}.${spriteImageType}`;
    }
}

function generateDisplayId(pokemonId) {
    let str = "" + pokemonId;
    let pad = "000";
    return pad.substring(0, pad.length - str.length) + str;
}


function convertToFeet(meters) {
    let inches = (meters * 39.3700787).toFixed(0);
    let feet = Math.floor(inches / 12);
    inches %= 12;

    return feet + "\" " + inches + '\'';
}

function convertToPounds(kilograms) {
    let lbs = kilograms * 2.20462;
    return Math.round(lbs * 100) / 100;
}

function idSortCompare(a, b) {
    if (a.id < b.id)
        return -1;
    if (a.id > b.id)
        return 1;
    return 0;
}