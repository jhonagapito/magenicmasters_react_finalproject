import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, NavLink } from 'react-router-dom';

import './Pokedex.css';
import PokedexImg from '../../assets/images/pokedex/PokedexOpen.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Media
import ReactPlayer from 'react-player';
import { getPokemonDetails, getMyTeam, addToMyTeam, removeFromMyTeam, getPokemonCry } from '../../actions/indexActions';
import {CRY_VOLUME, VOICE_VOLUME} from "../../constants/MEDIA_SETTINGS";
import PokemonCries from "../../data/PokemonCries";
import TypeBackgrounds from "../../data/TypeBackgrounds";
import Pokemon3dAnimated from "../../data/Pokemon3dAnimated";

// Components
import PokemonDualTypeDisplayer from '../PokemonType/PokemonDualTypeDisplayer';
import PokemonStatHex from './PokemonStatHex/PokemonStatHex';
import PokemonBasicInfo from './PokemonBasicInfo/PokemonBasicInfo';
import PokemonMoves from './PokemonMoves/PokemonMoves';
import PokemonAbilities from './PokemonAbilities/PokemonAbilities';
import PokemonBreedInfo from './PokemonBreedInfo/PokemonBreedInfo';
import Dpad from './Dpad/Dpad';

// Tab Names
const INFO = "INFO";
const STATS = "STATS";
const MOVES = "MOVES";
const ABILITIES = "ABILITIES";
const BREED = "BREED";

class Pokedex extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: true,
            caller: "",
            currentTab: INFO,
            currentTabView: null,
            introRead: false,
            totalPokemonCount: 151,
            enableRemove: false
        };
        this.onShutdownButtonClick = this.onShutdownButtonClick.bind(this);
        this.tabClickHandler = this.tabClickHandler.bind(this);
        this.addToTeamHandler = this.addToTeamHandler.bind(this);
        this.removeFromTeamHandler = this.removeFromTeamHandler.bind(this);
        this.checkAddRemoveButtonAvailability = this.checkAddRemoveButtonAvailability.bind(this);
        this.viewPrevious = this.viewPrevious.bind(this);
        this.viewNext = this.viewNext.bind(this);
        this.viewFirst = this.viewFirst.bind(this);
        this.viewLast = this.viewLast.bind(this);
    }
    componentWillMount() {
        let pokemonId=this.props.routerProps.match.params.id;
        this.getPokemon(pokemonId);
        this.handlerCaller(pokemonId);
        this.handleBackgroundBlurring();
    }
    componentDidUpdate() {
        if (!this.state.introRead) {
            // if (this.props.pokemon) this.tabClickHandler(this.state.currentTab);
            this.readInfo();
        }
    }
    
    handleTeamAddRemove(pokemon)
    {
        if(!this.state.enableRemove)
        {
            this.addToTeamHandler(pokemon);
        }else{
            this.removeFromTeamHandler(pokemon);
        }
    }

    handleBackgroundBlurring() {
        this.props.isPokedexOpen(true);
    }
    handlerCaller(pokemonId) {
        let caller=this.props.routerProps.location.pathname.replace("/" + pokemonId.toString(), "");
        this.setState({caller: caller});
    }
    getPokemon(pokemonId) {
        // let pokemonId=this.props.match.params.id;
        if (pokemonId > 0) {
            this.props.getPokemonDetails(pokemonId);
            this.props.getPokemonCry(pokemonId);
            // TODO: Need to optimize this by just retrieving the count
            this.props.getMyTeam();
            this.setState({pokemonId: pokemonId});
        }
        this.setAddRemoveButtonState(pokemonId);
    }
    onShutdownButtonClick() {
        window.responsiveVoice.cancel();
        window.responsiveVoice.speak("Good by", null, {volume: VOICE_VOLUME, rate: 1});
        this.props.isPokedexOpen(false);
        this.setState({isOpen: false});
    }
    tabClickHandler(tabName) {
        let newTabView = this.getTabView(tabName);
        this.setState({currentTabView: newTabView, currentTab: tabName});
    }
    getTabView(tabName) {
        let newTabView = "";
        // debugger;
        // if (this.state.currentTab==tabName) return;
        
        switch(tabName) {
            case STATS:
                newTabView = <PokemonStatHex powerStats={this.props.pokemon.powerStats}/>;
                break;
            case MOVES:
                newTabView = <PokemonMoves pokemon={this.props.pokemon} />;
                break;
            case ABILITIES:
                newTabView = <PokemonAbilities pokemon={this.props.pokemon} />;
                break;
            case BREED:
                newTabView = <PokemonBreedInfo pokemon={this.props.pokemon} />;
                break;
            case INFO:
            default:
            this.readInfo();
            newTabView = <PokemonBasicInfo pokemon={this.props.pokemon} />;
        }
        
        return newTabView;
    }
    viewFirst() {
        this.changePokemon(1);
    }
    viewLast() {
        this.changePokemon(this.state.totalPokemonCount);
    }
    viewPrevious() {
        let pokemonId = this.state.totalPokemonCount;
        if (this.props.pokemon.id > 1) {
            pokemonId = this.props.pokemon.id - 1;
        }
        this.changePokemon(pokemonId);
    }
    viewNext () {
        let pokemonId = 1;
        if (this.props.pokemon.id < this.state.totalPokemonCount) {
            pokemonId = this.props.pokemon.id + 1;
        }
        this.changePokemon(pokemonId);
    }
    changePokemon(pokemonId) {
        this.getPokemon(pokemonId);
        this.props.routerProps.history.push(this.state.caller + '/' + pokemonId);
        this.setState({introRead: false});
        window.responsiveVoice.cancel();
    }
    setAddRemoveButtonState(pokemonId) {
        if (this.props.myTeam && this.props.myTeam.find(x => x.pokemon.id == pokemonId)) {
            this.setState({enableRemove: true});
        }
        else {
            this.setState({enableRemove: false});
        }
    }
    readInfo() {
        if (!this.props.pokemon) return;
        window.responsiveVoice.cancel();

        let pokemon = this.props.pokemon.name;
        let description = this.props.pokemon.flavorText;
        let type = this.props.pokemon.type1 != this.props.pokemon.type2
                        ? this.props.pokemon.type1 + " and " + this.props.pokemon.type2
                        : this.props.pokemon.type1;
        type = "A" + type + " type pokemon. ";
        
        let textToRead = `${pokemon}. ${type} ${description}`;
        
        if (!this.state.introRead) {
            window.responsiveVoice.speak("Pause", null, {volume: 0, rate: 1.5});
        }
        
        // NOTE: The reader pauses every 100 characters. This avoids the issue most of the time by splitting sentences.
        let res = textToRead.replace(",", ".").split(". ");
        res.forEach(sentence => {
            window.responsiveVoice.speak(sentence, null, {volume: VOICE_VOLUME, rate: 1.2});
        });

        if(!this.state.introRead){
            this.setState({introRead: true});
        }
    }
    addToTeamHandler(pokemon) {
        window.responsiveVoice.speak(`${pokemon.name} joins the team`, null, {volume: VOICE_VOLUME, rate: 1.1});
        this.props.addToMyTeam(this.props.pokemon);
        this.setState({enableRemove: true});
    }
    removeFromTeamHandler(pokemon) {
        window.responsiveVoice.speak(`${pokemon.name} left the team`, null, {volume: VOICE_VOLUME, rate: 1.1});
        this.props.removeFromMyTeam(this.props.pokemon);
        this.setState({enableRemove: false});
    }
    checkAddRemoveButtonAvailability() {
        if (this.props.myTeam && this.props.myTeam.find(x => x.pokemon.id == this.props.pokemon.id)) {
            return true;
        }
        return this.props.myTeam.length < 6;
    }
    render() {
        if (this.state.isOpen === false) {
          return <Redirect to={this.state.caller} />;
        }
        if(!this.props.pokemon){
            return <div>Still Loading</div>;
        }

        let tabView = this.state.currentTabView ? this.getTabView(this.state.currentTab) : <PokemonBasicInfo pokemon={this.props.pokemon} />;
        
        return (
            <div className="pokedex-wrapper">
                <div className="pokedex-background" onClick={this.onShutdownButtonClick} />
                <div className={"pokedex-contents" + (!this.state.isOpen ? " closing" : "")}>
                    <div className="pokedex-bg" >
                        <img src={PokedexImg} />
                    </div>
                    <div className="pokedex-title" >
                        Pokedex v1.2
                    </div>
                    <div className="pokedex-pokemon-number" >
                        {this.props.pokemon.displayId}
                    </div>
                    <div className="left-side">
                        <div className="main-monitor">
                            <div className="main-monitor-screen">
                                {/* <img className="type-background" src="https://vignette.wikia.nocookie.net/pokemongo/images/9/92/Type_Background_Grass.png/revision/latest?cb=20171026003722" /> */}
                                <img className="type-background" src={TypeBackgrounds[this.props.pokemon.type1]} />
                                {/* <img className="pokemon-avatar" src="https://projectpokemon.org/home/uploads/monthly_2017_11/large.Animated.gif.ea91d691f5fa0c21bc722799e26a74a2.gif" /> */}
                                <img className="pokemon-avatar" src={Pokemon3dAnimated[this.props.pokemon.id - 1]} />
                            </div>
                        </div>
                        <div className="sub-monitor">
                            <div className="pokemon-name">
                                {this.props.pokemon.name}
                            </div>
                            <div className="pokemon-types">
                                <span>{this.props.pokemon.type1}</span>
                                {this.props.pokemon.type1 != this.props.pokemon.type2 &&
                                    <span> | {this.props.pokemon.type2}</span>}
                                {/* <PokemonDualTypeDisplayer
                                    type1={this.props.pokemon.type1}
                                    type2={this.props.pokemon.type2}
                                /> */}
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="btn btn-primary btn-shiny">View Shiny</button>
                            { this.checkAddRemoveButtonAvailability() &&
                                <button className="btn btn-primary btn-party" onClick={() => this.handleTeamAddRemove(this.props.pokemon)}>{!this.state.enableRemove ? "Add to my" : "Remove from"} Team</button>
                            } 
                            <button className="btn btn-primary btn-power" onClick={this.onShutdownButtonClick}><FontAwesomeIcon icon="power-off" /></button>
                            <div className="dpad-area">
                                <Dpad left={this.viewPrevious} right={this.viewNext} up={this.viewFirst} down={this.viewLast}/>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="info-monitor">
                            <div className="main-monitor-screen">
                                {tabView}
                            </div>
                        </div>
                        <div className="pokedex-btn-group">
                            <div className="pokedex-btn-group-row">
                                <button className="btn btn-primary" onClick={() => this.tabClickHandler(INFO)}>Info</button>
                                <button className="btn btn-primary" onClick={() => this.tabClickHandler(STATS)}>Stats</button>
                                <button className="btn btn-primary" onClick={() => this.tabClickHandler(MOVES)}>Moves</button>
                                <button className="btn btn-primary" onClick={() => this.tabClickHandler(ABILITIES)}>Ability</button>
                            </div>
                            <div className="pokedex-btn-group-row">
                                <button className="btn btn-primary" onClick={() => this.tabClickHandler(INFO)}>Evol</button>
                                <button className="btn btn-primary" onClick={() => this.tabClickHandler(INFO)}>Map</button>
                                <button className="btn btn-primary" onClick={() => this.tabClickHandler(BREED)}>Breed</button>
                                <button className="btn btn-primary" onClick={() => this.tabClickHandler(INFO)}>Series</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactPlayer url={PokemonCries[+this.state.pokemonId-1]}
                        className="bgm"
                        width="0"
                        height="0"
                        playing
                        volume={CRY_VOLUME}
                        />
            </div>
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
    return bindActionCreators({ getPokemonDetails, getPokemonCry, getMyTeam, addToMyTeam, removeFromMyTeam }, dispatch);
}

Pokedex.propTypes = {
    pokemon: PropTypes.object,
    match: PropTypes.object,
    getPokemonDetails: PropTypes.func,
    getPokemonCry: PropTypes.func,
    addToMyTeam: PropTypes.func.isRequired,
    removeFromMyTeam: PropTypes.func.isRequired,
    getMyTeam: PropTypes.func.isRequired,
    myTeam: PropTypes.array,
    routerProps: PropTypes.object,
    isPokedexOpen: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);
// export default Pokedex;