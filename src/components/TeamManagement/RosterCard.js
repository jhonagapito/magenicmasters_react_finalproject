import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonDualTypeDisplayer from '../PokemonType/PokemonDualTypeDisplayer';
import MiniDropdownMenu from './MiniDropdownMenu';

class RosterCard extends Component {
    render() {
        return (
        <div className="pbj-pokemon-roster-card">
        <div>
            <div className={"background type-1 " + this.props.roster.pokemon.type1}>
                <div className={"type-2 " + this.props.roster.pokemon.type2} />
                <div className="bg-shine" />
                <div className="bg-overlay" />
            </div>
            <div className="foreground">
                <div className="pokemon-box">
                <MiniDropdownMenu
                    roster={this.props.roster}
                    removeHandler={this.props.removeHandler}
                    editMovesHandler={this.props.showModalHandler}
                    />
                    <img src={this.props.roster.pokemon.imgUrl} alt={this.props.roster.pokemon.name} />
                    {/* <span className="number">#{this.props.roster.pokemon.displayId}</span> */}
                    <div className="meta">
                        <span className="name">{this.props.roster.pokemon.name}</span>
                        <PokemonDualTypeDisplayer
                            type1={this.props.roster.pokemon.type1}
                            type2={this.props.roster.pokemon.type2}
                        />
                    </div>
                </div>
                <div className="skills">
                    <div>Moves</div>
                    <div className="move-list">
                        { this.props.roster.moves.map((move, index) => 
                            <div className="skill" key={"skills-" + index}>
                                {/* <div className="name">Move {index + 1}</div> */}
                                {
                                    move && 
                                        <div>{move}</div>
                                }
                                </div>
                            )}
                    </div>
                   <div>Ability</div>
                    <div className="skill">
                        <div>Reproduce</div>
                    </div>
                     
                     {/* <button className="btn btn-success" onClick={() => this.props.showModalHandler(this.props.roster)}>Set Moves</button>
                     <button className="btn btn-danger" onClick={() => this.props.removeHandler(this.props.roster)}>Remove from my Team</button> */}

                </div>
                </div>
            </div>
        </div>
        );
    }
}

RosterCard.propTypes = {
    roster: PropTypes.object,
    removeHandler: PropTypes.func,
    showModalHandler: PropTypes.func
 };

export default RosterCard;