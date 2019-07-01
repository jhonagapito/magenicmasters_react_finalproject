import React from 'react';
import PropTypes from 'prop-types';
import './PokemonBreedInfo.css';

const PokemonBreedInfo = (props) => {
  return (
    <div className="pokemon-breed-info">
      <div className="pokedex-page-title">Breed Info</div>
      <div className="row">
          <div className="col-xs-6">
              <div><small>Height</small></div>
              <div><big>{props.pokemon.physicalStats.heightInFeet}</big></div>
      </div>
          <div className="col-xs-6">
              <div><small>Weight</small></div>
              <div><big>{props.pokemon.physicalStats.weightInPounds} lbs</big></div>
          </div>
      </div>
    </div>
  );
};

PokemonBreedInfo.propTypes = {
  pokemon: PropTypes.object,
  height: PropTypes.number,
  weight: PropTypes.number
};

export default PokemonBreedInfo;