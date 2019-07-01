import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './PokeballHeader.css';

const PokeballHeader = withRouter(props => {
  let isLocationHomepage = props.location.pathname == '/';
  return (
    <div className="pokeball-header-wrapper">
      <div className="pokeball-header">
        <div className="top">
          <img id="logo1" className="app-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png" />
        </div>
        <div className="contents">
          {/* TODO: This has some weird boolean inversion issue */}
          <NavLink className={"header-link" + (!isLocationHomepage ? 'active' : '' )} to="/">
              Home 
          </NavLink>
          <NavLink className="header-link" activeClassName="active" to="/pokedex">
              Pokedex 
          </NavLink>
          <NavLink className="header-link" activeClassName="active" to="/myteam">
              My Team 
          </NavLink>
        </div>
        <div className="bottom" />
      </div>
    </div>
  );
});

export default PokeballHeader;