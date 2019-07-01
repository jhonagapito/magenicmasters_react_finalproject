import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TeamManagementPage.less';
import RosterCard from './RosterCard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMyTeam, removeFromMyTeam} from '../../actions/indexActions';
import ReactPlayer from 'react-player';
import BGM from "../../assets/music/25 Pokémon Gym.mp3";
import {BGM_VOLUME} from "../../constants/MEDIA_SETTINGS";
import MoveSetupModal from './MoveSetupModal/MoveSetupModal';

class TeamManagementPage extends Component {
    constructor() {
        super();
        this.removeHandler = this.removeHandler.bind(this);
        this.showModalHandler = this.showModalHandler.bind(this);
        this.saveMovesHandler = this.saveMovesHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.state = {
            showModal: false,
            selectedRoster: null
        };
     }

    componentWillMount() {
        this.props.getMyTeam();
    }

    removeHandler(roster)
    {
        this.props.removeFromMyTeam(roster);
        window.responsiveVoice.speak(`${roster.pokemon.name} has left the team.`);
    }

    showModalHandler(roster){
        this.setState({
            showModal: true,
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
            <div className="pbj-pokemon-roster-card-list">
                 {this.props.myTeam.map((teamRoster, index) => 
                    <RosterCard
                        key={index}
                        roster={teamRoster}
                        removeHandler={this.removeHandler}
                        showModalHandler={this.showModalHandler}
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
    getMyTeam: PropTypes.func.isRequired,
    removeFromMyTeam: PropTypes.func.isRequired,
    selectedRoster: PropTypes.object
};

function mapStateToProps(state) {
  return {
    myTeam: state.myTeam
  };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({getMyTeam, removeFromMyTeam}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagementPage);
