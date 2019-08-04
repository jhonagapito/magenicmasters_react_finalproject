import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './PokemonList.less';
import PokemonListItem from './PokemonListItem';
import PokemonPagination from './pokemonPagination';

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
        this.props.pageSizeSelectHandler(Number(event.target.value));
    }

    selectPage(value) {
        this.setState({selectedPage: value});
        this.props.pageNumberSelectHandler(Number(value));
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
                            pokemonSelectHandler={this.props.pokemonSelectHandler}
                            />
                        )}
                </div>
                <PokemonPagination pokemonListTotal={this.props.pokemonListTotal} selectedPageSize={this.state.selectedPageSize} pageNumberSelectHandler={this.selectPage}  />  
            </React.Fragment>
        );
    }
}

PokemonList.propTypes = {
    pokemonSelectHandler: PropTypes.func,
    pokemonList: PropTypes.array,
    pokemonListTotal: PropTypes.number,
    pageSizeSelectHandler: PropTypes.func,
    pageNumberSelectHandler: PropTypes.func
};