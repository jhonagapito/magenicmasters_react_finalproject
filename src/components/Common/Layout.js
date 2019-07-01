'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { matchPath } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPokemonList } from '../../actions/indexActions';

// Component Dependencies
import PokeballHeader from '../PokeballHeader/PokeballHeader';
import Footer from './Footer.js';
import ReactPlayer from 'react-player';
import BgVideo from "../../assets/videos/background.mp4";
import Pokedex from '../Pokedex/Pokedex';
import './Layout.css';

// Component
class Layout extends React.Component {
  constructor() {
      super();
      this.state = {
          blurContent: false
      };

      this.handleContentBlurring = this.handleContentBlurring.bind(this);
  }
  componentWillMount() {
    this.handleContentBlurring();
  }
  handleContentBlurring(isModalOpen) {
    // let currentPath=window.location.pathname;
    // let trailingPathLength = currentPath.replace("/pokedex", "").length;
    if (isModalOpen) {
        this.setState({blurContent: true});
    }
    else {
      this.setState({blurContent: false});
    }
  }
  render() {
    return (
      <div>
        <div className={"blur" + (this.state.blurContent ? " on" : "")}>
          <div className="bg-video">
            <div className="bg-video-wrapper">
              <ReactPlayer url={BgVideo}
              className="player"
              width="100%"
              height="100%"
              playing
              loop
              volume={0}
              />
            </div>
          </div>
          <div className="App-contents">
            <PokeballHeader />
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
        <div>
            {/* <Route path="/pokedex/:id" component={PokemonDetails} /> */}
            {/* <Route path="/pokedex/:id" component={Pokedex}/> */}
            {/* <Route path="/pokedex/:id" component={(props) => <Pokedex isPokedexOpen={this.handleContentBlurring}/>} /> */}
            <Route path="/pokedex/:id" render={(props) => <Pokedex isPokedexOpen={this.handleContentBlurring} routerProps={props}/>} />
            <Route path="/myteam/:id" render={(props) => <Pokedex isPokedexOpen={this.handleContentBlurring} routerProps={props}/>} />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  // getPokemonList: PropTypes.func.isRequired
};

// function mapStateToProps(state) {
//   return {
//     pokemonList: state.pokemonList
//   };
// }

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({ getPokemonList }, dispatch);
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Layout);

export default Layout;