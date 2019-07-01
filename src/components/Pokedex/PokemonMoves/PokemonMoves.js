import React from 'react';
import PropTypes from 'prop-types';
import './PokemonMoves.css';

const PokemonMoves = (props) => {
  return (
    <div className="pokemon-moves">
        <div className="pokedex-page-title">Attainable Moves</div>
        <ul>
            {props.pokemon.moves.map((move, index) => 
                <li key={index} className="pokemon-move-li">{move}</li>
            )}
        </ul>
    </div>
  );
};

PokemonMoves.propTypes = {
  pokemon: PropTypes.object
};

export default PokemonMoves;