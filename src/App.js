import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import PokemonList from './components/Pokemon/PokemonList';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import Search  from './components/Search/Search';
import Banner from './components/Banner';
import PokeballHeader from './components/PokeballHeader/PokeballHeader';
import PokemonTypeToggleList from './components/PokemonType/PokemonTypeToggleList';
import PokemonMove from './components/PokemonMove/PokemonMove';
import Pokedex from './components/Pokedex/Pokedex';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPokemonList, resetPokemonList} from './actions/indexActions';
import ReactPlayer from 'react-player';
import BGM from "./assets/music/21 Pokémon Center.mp3";
import {BGM_VOLUME} from "./constants/MEDIA_SETTINGS";
// import BGM from "./assets/music/08 Professor Oak's Laboratory.mp3";

class App extends Component {
  constructor() {
    super();
    this.pokemonSelectHandler = this.pokemonSelectHandler.bind(this);
    this.resetList = this.resetList.bind(this);
    this.basePokemonList = [];
    this.state = {
      selectedPokemon: null,
      basePokemonList: null
    };
  }
  componentWillMount() {
    this.props.getPokemonList();
  }

  componentDidUpdate()
  {
    if(this.basePokemonList.length == 0)
    {
       this.basePokemonList = this.props.pokemonList;
    }
  }

  componentWillUnmount()
  {
    this.resetList();
  }

  pokemonSelectHandler(pokemon) {
    this.setState({selectedPokemon: pokemon});
  }

  resetList(){
    this.props.resetPokemonList(this.basePokemonList);
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="pokemon-list-container">
          
          {/* <ModalRoute path='/pokedex/:id' parentPath='/'>
              <PokemonDetails />
          </ModalRoute> */}
             <Search resetPokemonList={this.resetList} pokemonCount={!this.props.pokemonList ? 0 : this.props.pokemonList.length} />
            <PokemonList pokemonList={this.props.pokemonList} pokemonSelectHandler={this.pokemonSelectHandler} />
          </div>
        </div>
        <ReactPlayer url={BGM}
            className="bgm"
            width="0"
            height="0"
            playing
            loop
            volume={BGM_VOLUME}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pokemonList: state.pokemonList
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getPokemonList, resetPokemonList }, dispatch);
}

App.propTypes = {
  pokemonList: PropTypes.array,
  getPokemonList: PropTypes.func.isRequired,
  resetPokemonList: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);