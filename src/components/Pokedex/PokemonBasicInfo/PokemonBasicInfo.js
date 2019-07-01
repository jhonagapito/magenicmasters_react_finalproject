import React from 'react';
import PropTypes from 'prop-types';
import './PokemonBasicInfo.css';

const PokemonBasicInfo = (props) => {
  return (
    <div className="pokemon-basic-info">
        <div className="pokedex-page-title">{props.pokemon.name}</div>
        <div>
          {props.pokemon.flavorText}
        </div>
        <div className="basic-info-image">
          <img src={props.pokemon.imgUrl} alt={props.pokemon.name} />
        </div>
    </div>
  );
};

PokemonBasicInfo.propTypes = {
  pokemon: PropTypes.object,
  height: PropTypes.number,
  weight: PropTypes.number
};

export default PokemonBasicInfo;