import React, { Component } from 'react';
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
        );
    }
}

export default PokemonStatHex;