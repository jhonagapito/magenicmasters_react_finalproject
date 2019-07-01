import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasicSearch from './BasicSearch';
import AdvancedSearch from './AdvancedSearch';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';
import {basicSearch, advancedSearch, getPokemonTypes, getPokemonList, getAbilities,sort} from '../../actions/indexActions';

import './Search.css';


class Search extends Component {
  constructor() {
    super();
    this.basicSearchHandler = this.basicSearchHandler.bind(this);
    this.advancedSearchHandler = this.advancedSearchHandler.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.clear = this.clear.bind(this);
    this.selectedSortOrder = "";
    this.sortOrders = ["Lowest to Highest ID", "Highest to Lowest ID", "A-Z", "Z-A"];
    this.state = {
        isAdvancedSearch: false,
        searchText: "",
        showResultsCount: false
    }; 
}
    componentWillMount() {
        this.props.getPokemonTypes();
        this.props.getAbilities();
    }


    onSearchTextChange(searchText)
    {
        // debugger;
        this.setState({searchText: searchText});
    }
    sortHandler(event)
    {
        this.selectedSortOrder = event.target.value;
        this.props.sort(this.selectedSortOrder);
    }

  basicSearchHandler()
  {
      this.props.resetPokemonList();
      this.props.basicSearch(this.state.searchText);
      this.props.sort(this.selectedSortOrder);
      this.setState({showResultsCount: true});
  }

  advancedSearchHandler(selectedPokemonTypes, selectedAbility)
  {
      this.props.resetPokemonList();
      this.props.advancedSearch(this.state.searchText, selectedAbility, selectedPokemonTypes);
      this.props.sort(this.selectedSortOrder);
  } 

 showHideAdvancedSearch()
 {
     this.setState({isAdvancedSearch: !this.state.isAdvancedSearch});
 }
 clear() {
    // debugger;
    this.setState({searchText: ""});
    this.props.resetPokemonList();
    this.props.basicSearch("");
    this.props.sort(this.selectedSortOrder);
    this.setState({showResultsCount: false});
 }

  render() {
        if(!this.props.pokemonTypes) {
            return <div>Still loading!</div>;
        }
        
        return (<div className="search">
                    <h4>Search</h4>
                    <button className="btn btn-primary advanced-search-toggle" onClick={() => this.showHideAdvancedSearch()}>{!this.state.isAdvancedSearch ? "Show" : "Hide" } Advanced Search</button>
                    <div className="search-criteria">
                        <div className="row">
                            <div className="col-md-6">
                                <BasicSearch searchHandler={this.basicSearchHandler} isAdvancedSearch={this.state.isAdvancedSearch} onSearchTextChange={this.onSearchTextChange} onClear={this.clear}/>
                            </div>
                            {/* <div className="className="col-md-4 pull-right> */}
                            <div className="col-md-6" >
                                <div>Sort Order:</div>
                                <select className="form-control" onChange={(event) => this.sortHandler(event)}>
                                {  this.sortOrders.map((sortOrder, index) => {
                                        return <option key={index} value={index}>{sortOrder}</option>;
                                    })
                                }
                                </select>
                            </div>
                            {/* </div > */}
                        </div>
                    </div>
                    { this.state.showResultsCount &&
                        <div>{this.props.pokemonCount} match(es) found</div>}
                { this.state.isAdvancedSearch && 
                    <AdvancedSearch  searchHandler={this.advancedSearchHandler} pokemonTypes={this.props.pokemonTypes} pokemonAbilities={this.props.pokemonAbilities} clear={this.clear}/> }
            </div>
            );
    }

}

Search.propTypes = {
    pokemonTypes: PropTypes.array,
    getPokemonTypes: PropTypes.func.isRequired,
    basicSearch: PropTypes.func.isRequired,
    advancedSearch: PropTypes.func.isRequired,
    resetPokemonList: PropTypes.func.isRequired,
    pokemonAbilities: PropTypes.array,
    getAbilities: PropTypes.func.isRequired,
    sort: PropTypes.func.isRequired,
    pokemonCount: PropTypes.number
};

function mapStateToProps(state) {
  return {
    pokemonTypes: state.pokemonTypes,
    pokemonAbilities: state.pokemonAbilities
  };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({basicSearch, advancedSearch, getPokemonTypes, getAbilities, sort}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

