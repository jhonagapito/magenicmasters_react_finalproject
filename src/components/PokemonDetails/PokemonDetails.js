import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonStatHex from './PokemonStatHex';
import './PokemonDetails.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPokemonDetails, getMyTeam, addToMyTeam, getPokemonCry } from '../../actions/indexActions';
import ReactPlayer from 'react-player';
import {NavLink} from 'react-router-dom';
// import PokedexScreenBg from '../../assets/videos/PokedexScreenBg.mp4';
import {CRY_VOLUME} from "../../constants/MEDIA_SETTINGS";
import PokemonCries from "../../data/PokemonCries";

import PokemonDualTypeDisplayer from '../PokemonType/PokemonDualTypeDisplayer';

// import SfxCry from "../../assets/music/sfx/cries/1.ogg";
// import SfxCry from "../../assets/music/21 Pokémon Center.mp3";

class PokemonDetails extends Component {
    constructor() {
        super();
        this.state = {
            pokemonId: 0
        };
    }
    componentWillMount() {
        let pokemonId=this.props.match.params.id;
        if (pokemonId > 0) {
            this.props.getPokemonDetails(pokemonId);
            this.props.getPokemonCry(pokemonId);
            // TODO: Need to optimize this by just retrieving the count
            this.props.getMyTeam();
            this.setState({pokemonId: pokemonId});
        }
    }
    render() {
        return (
            this.props.pokemon ?
            <div className="pokemon-details-wrapper">
                <NavLink exact to={`/pokedex`}><div className="pokemon-details-background" /></NavLink>
                <div className="pokemon-details">
                    {/* <ReactPlayer url={this.props.pokemon.cry} */}
                    {/* <ReactPlayer url={this.props.pokemonCry} */}
                    <ReactPlayer url={PokemonCries[+this.state.pokemonId-1]}
                        className="bgm"
                        width="0"
                        height="0"
                        playing
                        volume={CRY_VOLUME}
                        />
                    <div className="pbj-pokemon-bio center">
                        {/* <ReactPlayer url={PokedexScreenBg} */}
                        {/* <ReactPlayer url="https://www.youtube.com/watch?v=7pMlbzH8oH0" */}
                        {/* <ReactPlayer url="https://www.youtube.com/watch?v=jX8liqmebWk" */}
                        {/* <ReactPlayer url="https://www.youtube.com/watch?v=A7ZkZazfvao" */}
                        <ReactPlayer url="https://www.youtube.com/watch?v=rRNWW38WgGs"
                            className="player"
                            width="100%"
                            height="100%"
                            playing
                            controls={false}
                            loop
                            volume={0}
                            />
                        <div className="power-stats info-box">
                            <h5>Statistics</h5>
                            <div>
                                <div>Basic Info</div>
                                <PokemonStatHex powerStats={this.props.pokemon.powerStats}/>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <div><small>HP</small></div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{width: this.props.pokemon.powerStats.hp + '%'}} 
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.pokemon.powerStats.hp}
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <div><small>Speed</small></div>
                                        <div className="progress">
                                            <div className="progress-bar bg-warning" role="progressbar" style={{width: this.props.pokemon.powerStats.speed + '%'}} 
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.pokemon.powerStats.speed}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                    <div><small>Attack</small></div>
                                        <div className="progress">
                                            <div className="progress-bar bg-danger" role="progressbar" style={{width: this.props.pokemon.powerStats.attack + '%'}} 
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.pokemon.powerStats.attack}
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <div><small>Defense</small></div>
                                        <div className="progress">
                                            <div className="progress-bar bg-info" role="progressbar" style={{width: this.props.pokemon.powerStats.defense + '%'}} 
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.pokemon.powerStats.defense}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <div><small>Special Attack</small></div>
                                            <div className="progress">
                                                <div className="progress-bar bg-danger" role="progressbar" style={{width: this.props.pokemon.powerStats["special-attack"] + '%'}} 
                                                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.pokemon.powerStats["special-attack"]}
                                                    </div>
                                            </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <div><small>Special Defense</small></div>
                                        <div className="progress">
                                            <div className="progress-bar bg-info" role="progressbar" style={{width: this.props.pokemon.powerStats["special-defense"] + '%'}} 
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.pokemon.powerStats["special-defense"]}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <div>Physical Statistics</div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <div><small>Height</small></div>
                                        <div><big>{this.props.pokemon.physicalStats.height} m</big></div>
                                </div>
                                    <div className="col-xs-6">
                                        <div><small>Weight</small></div>
                                        <div><big>{this.props.pokemon.physicalStats.weight} kg</big></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pokemon">
                            <img src={this.props.pokemon.imgUrl} alt={this.props.pokemon.name} />
                            <div className="title">
                                <span className="name">{this.props.pokemon.name}</span>
                            </div>
                            <PokemonDualTypeDisplayer
                                type1={this.props.pokemon.type1}
                                type2={this.props.pokemon.type2}
                            />
                            <button className="btn btn-danger" onClick={() => this.props.addToMyTeam(this.props.pokemon)} disabled={this.props.getMyTeam.length >= 6}>Add to my Team</button> 
                            <NavLink exact to={`/pokedex`}><button className="btn btn-danger">Close</button></NavLink> 
                        </div>
                        <div className="details info-box">
                            <h5>Summary</h5>
                            {this.props.pokemon.flavorText}
                        </div>
                    </div>
                </div>
            </div>
            : null
        );
    }
}

function mapStateToProps(state) {
    return {
      pokemon: state.pokemon,
      pokemonCry: state.pokemonCry,
      myTeam: state.myTeam
    };
}
  
function mapDispatchToProps(dispatch){
    return bindActionCreators({ getPokemonDetails, getPokemonCry, getMyTeam, addToMyTeam }, dispatch);
}

PokemonDetails.propTypes = {
    pokemon: PropTypes.object,
    match: PropTypes.object,
    getPokemonDetails: PropTypes.func,
    getPokemonCry: PropTypes.func,
    addToMyTeam: PropTypes.func.isRequired,
    getMyTeam: PropTypes.func.isRequired,
    myTeam: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails);