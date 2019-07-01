import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PokemonTypeToggleList from '../PokemonType/PokemonTypeToggleList';
import PokemonMove from '../PokemonMove/PokemonMove';


class AdvancedSearch extends Component {
    constructor()
    {
        super();
        this.selectedAbility = "";
        this.selectedPokemonTypes = [];

        this.onClick = this.onClick.bind(this);
        this.selectMoveHanlder = this.selectMoveHanlder.bind(this);
        this.clear = this.clear.bind(this);
    }

    onClick(event)
    {
        if(event.target.checked)
        {
            this.selectedPokemonTypes = this.selectedPokemonTypes.concat(event.target.value);
        }
        else
        {
            this.selectedPokemonTypes = this.selectedPokemonTypes.filter((value) => (value != event.target.value));
        }
    }

    selectMoveHanlder(moveName){
        this.selectedAbility = event.target.value;
    }
    clear() {
        this.props.clear();
    }

    render(){
        if(!this.props.pokemonTypes || !this.props.pokemonAbilities){
            return <div>Still Loading</div>;
        }

        return (
            <div>
                <div className="advanced-search">
                <div className="row">
                    <div className="search-criteria col-md-6">
                        <div>Select Type(s):</div>
                        <PokemonTypeToggleList types={this.props.pokemonTypes} handleTypeClick={this.onClick} />
                    </div>
                    <div className="search-criteria col-md-6">
                        <div>Select Ability:</div>
                        <PokemonMove moves={this.props.pokemonAbilities} onSelect={this.selectMoveHanlder}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-group" role="group">
                            <button className="btn btn-danger" onClick={() => this.props.searchHandler(this.selectedPokemonTypes, this.selectedAbility)}>Search</button>
                            <button className="btn btn-danger" onClick={() => this.clear()}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

AdvancedSearch.propTypes = {
    searchHandler: PropTypes.func.isRequired,
    pokemonTypes: PropTypes.array.isRequired,
    pokemonAbilities: PropTypes.array.isRequired,
    clear: PropTypes.func
};

export default AdvancedSearch;
