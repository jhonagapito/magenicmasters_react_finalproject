import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TeamManagementPage.less';
import RosterCard from './RosterCard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMyTeam, removeFromMyTeam, selectTeam, addTeamName, getTeamNames, getNatures} from '../../actions/indexActions';
import ReactPlayer from 'react-player';
import BGM from "../../assets/music/25 Pokémon Gym.mp3";
import {BGM_VOLUME} from "../../constants/MEDIA_SETTINGS";
import MoveSetupModal from './MoveSetupModal/MoveSetupModal';
import NatureSetupModal from './NatureSetupModal/NatureSetupModal';

class TeamManagementPage extends Component {
    constructor() {
        super();
        this.removeHandler = this.removeHandler.bind(this);
        this.showModalHandler = this.showModalHandler.bind(this);
        this.showNatureModalHandler = this.showNatureModalHandler.bind(this);
        this.saveMovesHandler = this.saveMovesHandler.bind(this);
        this.saveNatureHandler = this.saveNatureHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.selectTeamHandler = this.selectTeamHandler.bind(this);
        this.addTeamHandler = this.addTeamHandler.bind(this);
        this.state = {
            showModal: false,
            showNatureModal: false,
            selectedRoster: null,
            teamList: [],
            selectedTeam: ""
        };
     }

    componentWillMount() {
        this.props.getMyTeam();
        this.props.getTeamNames();
        this.props.getNatures();
        if(this.props.teamNames.length > 0) {
            this.props.selectTeam(this.props.teamNames[0]);
        }
    }

    getTeamsList() {
        let poke_teams = JSON.parse(localStorage.getItem('pokemon_teams') || '[]');
        this.setState({teamList: poke_teams});
    }

    removeHandler(roster)
    {
        this.props.removeFromMyTeam(roster);
        window.responsiveVoice.speak(`${roster.pokemon.name} has left the team.`);
    }

    selectTeamHandler(event) {
        this.setState({ selectedTeam: event.target.value }, function() {
            this.props.selectTeam(this.state.selectedTeam);
        });
    }

    showModalHandler(roster){
        this.setState({
            showModal: true,
            selectedRoster: roster
        });
    }

    showNatureModalHandler(roster) {
        this.setState({
            showNatureModal: true,
            selectedRoster: roster
        });
    }

    closeModalHandler() {
        this.setState({
            showModal: false,
            selectedRoster: null
        });
    }
    saveMovesHandler(selectedMoves){
        let roster = this.state.selectedRoster;
        roster.moves = selectedMoves;
        this.setState({selectedRoster: roster});
    }

    saveNatureHandler(selectedNature) {
        let roster = this.state.selectedRoster;
        roster.nature = selectedNature;
        this.setState({selectedRoster: roster});
        this.closeModalHandler();
    }

    addTeamHandler() {
        let teamName = prompt('Please Input Team Name');
        if(teamName) {
            this.setState({
                teamList: [...this.state.teamList, teamName]
            });
            this.props.addTeamName(teamName);
            this.props.getTeamNames();
        }
    }
    
    render() {
        
        if(!this.props.myTeam){
            return <div>Still loading</div>;
        }
        return (
            <div>
            { this.state.showModal &&
                <MoveSetupModal
                    roster={this.state.selectedRoster}
                    saveMovesHandler={this.saveMovesHandler}
                    closeModalHandler={this.closeModalHandler}/>
            }

            {
                this.state.showNatureModal && 
                <NatureSetupModal
                    roster={this.state.selectedRoster}
                    pokemonNatures={this.props.pokemonNatures}
                    saveNatureHandler={this.saveNatureHandler}
                    closeModalHandler={this.closeModalHandler}/>
            }
            <div className="pbj-pokemon-roster-card-list controls-container">
                <div className="controls-holder">
                    <button id="addTeam" className="btn btn-danger" onClick={this.addTeamHandler}>Add Team</button>
                    <select id="teamList" className="form-control" value={this.state.selectedTeam} onChange={this.selectTeamHandler}>
                        { this.props.teamNames && this.props.teamNames.length == 0 && <option value="Team 1">No Teams</option> }
                        { this.props.teamNames && this.props.teamNames.length > 0 &&
                            [...this.props.teamNames.map((e, i) => {
                                return <option key={i} value={e}>{e}</option>;
                            })]
                        }
                    </select>
                </div>
            </div>
            <div className="pbj-pokemon-roster-card-list">
                 { this.props.myTeam && this.props.myTeam.map((teamRoster, index) => 
                    <RosterCard
                        key={index}
                        roster={teamRoster}
                        removeHandler={this.removeHandler}
                        showModalHandler={this.showModalHandler}
                        showNatureModalHandler={this.showNatureModalHandler}
                        />
                    )}
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

TeamManagementPage.propTypes = {
    myTeam: PropTypes.array,
    teamNames: PropTypes.array,
    getMyTeam: PropTypes.func.isRequired,
    removeFromMyTeam: PropTypes.func.isRequired,
    selectedRoster: PropTypes.object,
    selectTeam: PropTypes.func.isRequired,
    addTeamName: PropTypes.func.isRequired,
    getTeamNames: PropTypes.func.isRequired,
    pokemonNatures: PropTypes.array
};

function mapStateToProps(state) {
  console.log(state);
  return {
    myTeam: state.myTeam,
    teamNames: state.teamNames,
    pokemonNatures: state.pokemonNatures
  };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({getMyTeam, removeFromMyTeam, selectTeam, addTeamName, getTeamNames, getNatures}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagementPage);
