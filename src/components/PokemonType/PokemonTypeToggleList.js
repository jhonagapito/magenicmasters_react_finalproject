import React from 'react';
import PropTypes from 'prop-types';
import './PokemonType.css';
import PokemonTypeToggleButton from './PokemonTypeToggleButton';

const PokemonTypeToggleList = (props) => {
  let checkedValue=true;
  return (
    <div className="type-box-selection-group">
    {props.types.map((type, index) => 
            <PokemonTypeToggleButton key={index} controlId={type.name} typeName={type.name} handleClick={props.handleTypeClick} checked={checkedValue}/>
        )}
    </div>
  );
};

PokemonTypeToggleList.propTypes = {
  types: PropTypes.array,
  handleTypeClick: PropTypes.func
};

export default PokemonTypeToggleList;