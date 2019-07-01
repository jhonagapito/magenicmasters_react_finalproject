import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import { NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player';
import BGM from "../../assets/music/03 Title Screen.mp3";
import {BGM_VOLUME} from "../../constants/MEDIA_SETTINGS";

class Home extends Component {
    render() {
        return (
            <div className="home menu-card-container">
                <img id="logo1" className="app-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png" />
                <br />
                <NavLink className="menu-card" to="/pokedex">
                    <img className="pokedex"src="https://vignette.wikia.nocookie.net/pokemon-heroes/images/5/5c/Gen_I_Pokedex.png/revision/latest/scale-to-width-down/640?cb=20140420234743" />
                    <div className="info">
                        <div className="name">Pokedex</div>
                        <div className="line" />
                        <div className="description">
                            Check out all pokemon. Check their stats, abilities, and charm and find your favorite. Check out all pokemon. Check their stats, abilities, and charm and find your favorite.
                        </div>
                    </div>
                </NavLink>
                <NavLink className="menu-card" to="/myTeam">
                    <img className="team-builder"src="https://media.alienwarearena.com/media/71559702c2b20240f3f4e2116346a704.jpg" />
                    <div className="info">
                        <div className="name">Team Builder</div>
                        <div className="line" />
                        <div className="description">
                            Create your dream pokemon team. Set skills, stats, and more. Create your dream pokemon team. Set skills, stats, and more. Create your dream pokemon team. Set skills, stats, and more. 
                        </div>
                    </div>
                </NavLink>
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

export default Home;