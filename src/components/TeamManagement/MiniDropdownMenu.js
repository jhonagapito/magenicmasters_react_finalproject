import React from 'react';
import PropTypes from 'prop-types';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

const MiniDropdownMenu = (props) => {
  return (
    <div className="dropdown-button">
      <DropdownButton
        // bsStyle="default"
        title=""
        // key={i}
        // id={`dropdown-basic-${i}`}
        id="1"
        pullRight
      >
        {/* NOTE: MenuItem href does a callback/page refresh. ruins the SPA feel */}
        {/* <MenuItem eventKey="1" href={`pokemon/${props.roster.pokemon.id}`}>View</MenuItem> */}
        <li><NavLink to={`myTeam/${props.roster.pokemon.id}`} className="dropdown-link"><FontAwesomeIcon icon="search" /> View</NavLink></li>
        <MenuItem eventKey="2" onClick={() => props.editMovesHandler(props.roster)}><FontAwesomeIcon icon="edit" /> Set Moves</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="3" onClick={() => props.removeHandler(props.roster)}><FontAwesomeIcon icon="heart-broken" /> Remove from my team</MenuItem>
      </DropdownButton>
    </div>
  );
};

MiniDropdownMenu.propTypes = {
  roster: PropTypes.object,
  removeHandler: PropTypes.func,
  editMovesHandler: PropTypes.func
};

export default MiniDropdownMenu;