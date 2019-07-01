import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './PokemonList.less';
import PokemonListItem from './PokemonListItem';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

export default class PokemonList extends Component {
    render() {
        if(!this.props.pokemonList) {
            return <div>Still loading!</div>;
        }
        
        return (
            <div className="pbj-pokemon-list">
                {this.props.pokemonList.map((pokemon, index) => 
                    <PokemonListItem
                        key={index}
                        pokemon={pokemon}
                        // name={pokemon.name}
                        // imgUrl={pokemon.imgUrl}
                        // displayId={pokemon.displayId}
                        // type1={pokemon.type1}
                        // type2={pokemon.type2}
                        pokemonSelectHandler={this.props.pokemonSelectHandler}
                        />
                    )}
            </div>
        );
    }
}

PokemonList.propTypes = {
    pokemonSelectHandler: PropTypes.func,
    pokemonList: PropTypes.array
};