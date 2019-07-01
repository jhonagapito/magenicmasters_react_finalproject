import React from 'react';
import { NavLink } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="App-banner">
            <NavLink className="App-NavLink" to="/">
                Home 
            </NavLink>
            <NavLink className="App-NavLink" to="/myteam">
                My Team 
            </NavLink>
        </div>
    );
};

export default Banner;