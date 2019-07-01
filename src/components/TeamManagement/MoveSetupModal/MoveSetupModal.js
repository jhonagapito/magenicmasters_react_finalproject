import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MoveSetupModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bgImage } from '../../../assets/images/backgrounds/bg-training-ground.jpg';

class MoveSetupModal extends Component {
  constructor() {
    super();
    this.state = {
      selectableMoves: [],
      selectedMoves: ["", "", "", ""],
      moveDropdownItems: [[], [], [], []],
      selectedMovesInstatiated: false
    };
    this.saveMoves = this.saveMoves.bind(this);
  }
  componentWillMount() {
    this.setState({
      selectableMoves: this.props.roster.pokemon.moves,
      selectedMoves: this.props.roster.moves,
      selectedMovesInstatiated: true
    });

    this.setDropdownValues();
  }
  getDropdownListItems(index) {
    let allMoves = this.props.roster.pokemon.moves;
    let selectedMovesToFilter = this.state.selectedMovesInstatiated ? this.state.selectedMoves : (this.props.roster.moves ? this.props.roster.moves : []);
    let selectedMoves = selectedMovesToFilter.filter(x => x && x != selectedMovesToFilter[index]);

    let unassignedMoves = allMoves.filter(function (el) {
      return !selectedMoves.includes(el);
    });
    this.setState({ selectableMoves: unassignedMoves });
    return unassignedMoves;
  }
  setDropdownValues() {
    let lists = this.state.moveDropdownItems;
    let newList = [];
    lists.forEach((list, i) => {
      newList.push(this.getDropdownListItems(i));
    });

    this.setState({ moveDropdownItems: newList });
  }
  selectMoveHandler(event, selectedMoveIndex) {
    if (event.target.value != "") {
      let roster = this.props.roster;
      let currentMoves = this.state.selectedMoves;
      currentMoves[selectedMoveIndex] = event.target.value;
      this.setState({ selectedMoves: currentMoves });

      this.setDropdownValues();
    }
  }
  saveMoves() {
    this.props.saveMovesHandler(this.state.selectedMoves);
  }
  render() {
    return (
      <div className="move-setup">
        <img url={bgImage} className="move-setup-background" />
        <div className="move-setup-contents">
          <div className="move-setup-title">Move Assignment</div>
          <img src={this.props.roster.pokemon.imgUrl} alt={this.props.roster.pokemon.name} />
          <div className="move-setup-dropdowns">
            {
              this.state.selectedMoves.map((selectedMove, index) =>
                <div className="" key={index}>
                  <select className="form-control" onChange={(event) => this.selectMoveHandler(event, index)} value={this.props.roster.moves[index]}>
                    <option key="" />
                    {
                      this.state.moveDropdownItems[index].map((pokemonMove) =>
                        <option key={pokemonMove} value={pokemonMove}>
                          {pokemonMove}
                        </option>
                      )}
                  </select>
                </div>
              )}
          </div>
          <button className="btn btn-danger btn-save-selected-moves" onClick={this.saveMoves}>Assign</button>
          <button className="btn btn-danger btn-close-selected-moves" onClick={this.props.closeModalHandler}><FontAwesomeIcon icon="times" /></button>
        </div>
      </div>
    );
  }
}

MoveSetupModal.propTypes = {
  roster: PropTypes.object,
  selectedMoves: PropTypes.func,
  saveMovesHandler: PropTypes.func,
  closeModalHandler: PropTypes.func
};

export default MoveSetupModal;