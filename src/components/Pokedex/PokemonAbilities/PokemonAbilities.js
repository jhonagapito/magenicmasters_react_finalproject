import React from 'react';
import PropTypes from 'prop-types';
import './PokemonAbilities.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PokemonAbilities = (props) => {
  return (
    <div className="pokemon-abilities">
        <div className="pokedex-page-title">Attainable Abilities</div>
        <ul>
            {props.pokemon.abilities.map((ability, index) => 
                <li key={index} className="pokemon-move-li">
                  {ability.ability.name}
                  <div className="hidden-ability-icon">
                    <FontAwesomeIcon icon={ability.is_hidden ? "eye-slash" : "eye"} />
                  </div>
                </li>
            )}
        </ul>
    </div>
  );
};

PokemonAbilities.propTypes = {
  pokemon: PropTypes.object
};

export default PokemonAbilities;