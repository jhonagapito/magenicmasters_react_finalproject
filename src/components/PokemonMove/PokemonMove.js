import React from 'react';
import PropTypes from 'prop-types';
import './PokemonMove.css';

const PokemonMove = (props) => {
  return (
    <select className="form-control" onChange={(event) => props.onSelect(event)}>
      <option key=""/>
      {props.moves.map((move, index) => 
        <option key={index}>
            {move.name}
        </option>
      )}
    </select>
  );
};

PokemonMove.propTypes = {
  moves: PropTypes.array,
  onSelect: PropTypes.func
};

export default PokemonMove;