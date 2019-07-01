import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
const PokemonListItem = props => {

    return (
        <NavLink exact to={`pokedex/${props.pokemon.id}`}>
            <div className="pbj-pokemon-card" onClick={(pokemon) => props.pokemonSelectHandler(props.pokemon)}>
                <div>
                    <div className={"background type-1 " + props.pokemon.type1}>
                        <div className={"type-2 " + props.pokemon.type2} />
                        <div className="bg-shine" />
                        <div className="bg-overlay" />
                        <div className="type-1-name">{props.pokemon.type1}★{props.pokemon.type1}★{props.pokemon.type1}</div>
                        <div className="type-2-name">{props.pokemon.type2}★{props.pokemon.type2}★{props.pokemon.type2}</div>
                    </div>
                    <div className="foreground">
                        <img src={props.pokemon.imgUrl} alt={props.pokemon.name} />
                        <div className="title">
                            <span className="number">#{props.pokemon.displayId}</span>
                            <span className="name">{props.pokemon.name}</span>
                        </div>  
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

PokemonListItem.propTypes = {
    pokemonSelectHandler: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired
};

export default PokemonListItem;