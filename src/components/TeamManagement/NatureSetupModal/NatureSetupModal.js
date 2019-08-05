import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NatureSetupModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bgImage } from '../../../assets/images/backgrounds/bg-training-ground.jpg';

class NatureSetupModal extends Component {
  constructor() {
    super();
    this.state = {
      selectableMoves: [],
      selectedMoves: ["", "", "", ""],
      moveDropdownItems: [[], [], [], []],
      selectedMovesInstatiated: false,
      selectedNature: ""
    };
    this.saveNature = this.saveNature.bind(this);
    this.selectNatureHandler = this.selectNatureHandler.bind(this);
  }
  componentWillMount() {
    this.setState({
      selectableMoves: this.props.roster.pokemon.moves,
      selectedMoves: this.props.roster.moves,
      selectedMovesInstatiated: true
    });
  }

  selectNatureHandler(event) {
    this.setState({selectedNature: event.target.value});
  }

  saveNature() {
    this.props.saveNatureHandler(this.state.selectedNature);
  }
  
  render() {
    if(!this.props.roster) {
      return <div></div>
    }
    return (
      <div className="move-setup">
        <img url={bgImage} className="move-setup-background" />
        <div className="move-setup-contents">
          <div className="move-setup-title">Nature Assignment</div>
          <img src={this.props.roster.pokemon.imgUrl} alt={this.props.roster.pokemon.name} />
          <div className="move-setup-dropdowns">
            {
              <select className="form-control" onChange={(event) => this.selectNatureHandler(event)} value={this.state.selectedNature}>
                <option key="" />
                {
                  this.props.pokemonNatures.map((nature, index) =>
                    <option key={index} value={nature.name}>
                      {nature.name}
                    </option>
                  )}
              </select>
            }
          </div>
          <button className="btn btn-danger btn-save-selected-moves" onClick={this.saveNature}>Assign</button>
          <button className="btn btn-danger btn-close-selected-moves" onClick={this.props.closeModalHandler}><FontAwesomeIcon icon="times" /></button>
        </div>
      </div>
    );
  }
}

NatureSetupModal.propTypes = {
  roster: PropTypes.object,
  selectedMoves: PropTypes.func,
  saveNatureHandler: PropTypes.func,
  closeModalHandler: PropTypes.func,
  pokemonNatures: PropTypes.array
};

export default NatureSetupModal;