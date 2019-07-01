import React from 'react';
import PropTypes from 'prop-types';
import './PokemonType.css';

const PokemonTypeLabel = (props) => {
  return (
    <label htmlFor={props.labelFor} className={"type-box " + props.typeName + (props.isClickable ? ' is-clickable' : '')} title="Strong against:
    Weak against: ">{props.typeName}</label>
  );
};

PokemonTypeLabel.propTypes = {
  labelFor: PropTypes.string,
  typeName: PropTypes.string,
  isClickable: PropTypes.bool
};

export default PokemonTypeLabel;