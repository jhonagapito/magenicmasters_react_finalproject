import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './PokemonList.less';
import PokemonListItem from './PokemonListItem';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

export default class PokemonList extends Component {
    constructor() {
        super();
        this.selectPageSize = this.selectPageSize.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.state = {
          selectedPageSize: 10,
          selectedPage: 1
        };
    }

    selectPageSize (event) {
        this.setState({selectedPageSize: event.target.value});
        this.props.pageSizeSelectHandler(event.target.value);
    }

    selectPage(value) {
        this.setState({selectedPage: value});
        this.props.pageNumberSelectHandler(value);
    }
    render() {
        if(!this.props.pokemonList) {
            return <div>Still loading!</div>;
        }
        
        return (
            <React.Fragment>
                <div className="pageSizeContainer">
                    <select id="pageSize" onChange={this.selectPageSize} value={this.state.selectedPageSize}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="0">All</option>
                    </select>
                </div>
                <div className="pbj-pokemon-list">
                {this.props.pokemonList.map((pokemon, index) => 
                    <PokemonListItem
                        key={index}
                        pokemon={pokemon}
                        // name={pokemon.name}
                        // imgUrl={pokemon.imgUrl}
                        // displayId={pokemon.displayId}
                        // type1={pokemon.type1}
                        // type2={pokemon.type2}
                        pokemonSelectHandler={this.props.pokemonSelectHandler}
                        />
                    )}
            </div>
            <div className="paginationContainer">
                <div className="pagination">
                    <a href="#">&laquo;</a>
                    <a className="active" href="#" onClick={() => this.selectPage(1)}>1</a>
                    <a href="#" onClick={() => this.selectPage(2)}>2</a>
                    <a href="#" onClick={() => this.selectPage(3)}>3</a>
                    <a href="#" onClick={() => this.selectPage(4)}>4</a>
                    <a href="#" onClick={() => this.selectPage(5)}>5</a>
                    <a href="#" onClick={() => this.selectPage(6)}>6</a>
                    <a href="#">&raquo;</a>
                </div>
            </div>
            
            </React.Fragment>
        );
    }
}

PokemonList.propTypes = {
    pokemonSelectHandler: PropTypes.func,
    pokemonList: PropTypes.array,
    pageSizeSelectHandler: PropTypes.func,
    pageNumberSelectHandler: PropTypes.func
};