import React from 'react';
import PropTypes from 'prop-types';
import './PokemonType.css';
import PokemonTypeLabel from './PokemonTypeLabel';

const PokemonDualTypeDisplayer = (props) => {
    let areSimilar = props.type1 == props.type2;
    return (
        <div className={"types" + (areSimilar ? " solo" : "")}>
            <PokemonTypeLabel typeName={props.type1} />
            <PokemonTypeLabel typeName={props.type2} />
        </div>
    );
};

PokemonDualTypeDisplayer.propTypes = {
    type1: PropTypes.string,
    type2: PropTypes.string,
};

export default PokemonDualTypeDisplayer;