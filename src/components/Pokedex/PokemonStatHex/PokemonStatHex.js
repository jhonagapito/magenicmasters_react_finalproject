import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Styles from './PokemonStatHex.less';
import Less from 'less';

class PokemonStatHex extends Component {
    componentWillMount() {
        this.updateValues();
    }
    updateValues() {
        // console.log("2", Styles);
        // Less.sheets = [Styles];
        // console.log("Less.sheets2", Less.sheets);
        
        // Less.refreshStyles();
        Less.modifyVars({
            '@stat1': '100px',
            '@stat2': '200px'
          });
        // Less.refreshStyles();
    }
    render() {
        return (
            <div className="pokedex-stats">
                <div className="pokedex-page-title">Power Statistics</div>
                <div>
                    <link rel="stylesheet/less" href="./PokemonStatHex.less" />
                    <div className="stat-hex">
                        <div className="tri1" />
                        <div className="tri2" />
                        <div className="tri3" />
                        <div className="tri4" />
                        <div className="tri5" />
                        <div className="tri6" />
                    </div>
                    <script src="less.js" stats1="1000px" />
                    <link data-dump-line-numbers="all" data-global-vars='{ "tri1": "100px", "tri2": "0px" }' rel="stylesheet/less" type="text/css" href="less/styles.less" />
                </div>
                <div>
                    <div className="row">
                        <div className="col-xs-6">
                            <div><small>HP</small></div>
                            <div className="progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{width: this.props.powerStats.hp + '%'}} 
                                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.powerStats.hp}
                                    </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div><small>Speed</small></div>
                            <div className="progress">
                                <div className="progress-bar bg-warning" role="progressbar" style={{width: this.props.powerStats.speed + '%'}} 
                                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.powerStats.speed}
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                        <div><small>Attack</small></div>
                            <div className="progress">
                                <div className="progress-bar bg-danger" role="progressbar" style={{width: this.props.powerStats.attack + '%'}} 
                                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.powerStats.attack}
                                    </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div><small>Defense</small></div>
                            <div className="progress">
                                <div className="progress-bar bg-info" role="progressbar" style={{width: this.props.powerStats.defense + '%'}} 
                                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.powerStats.defense}
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <div><small>Special Attack</small></div>
                                <div className="progress">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{width: this.props.powerStats["special-attack"] + '%'}} 
                                        aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.powerStats["special-attack"]}
                                        </div>
                                </div>
                        </div>
                        <div className="col-xs-6">
                            <div><small>Special Defense</small></div>
                            <div className="progress">
                                <div className="progress-bar bg-info" role="progressbar" style={{width: this.props.powerStats["special-defense"] + '%'}} 
                                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{this.props.powerStats["special-defense"]}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PokemonStatHex.propTypes = {
    powerStats: PropTypes.object
};

export default PokemonStatHex;