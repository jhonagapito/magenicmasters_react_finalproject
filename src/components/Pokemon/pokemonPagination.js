import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './pokemonPagination.less';

export default class PokemonPagination extends Component {
    constructor() {
        super();
        this.selectPage = this.selectPage.bind(this);
        this.state = {
          selectedPage: 1
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedPageSize !== this.props.selectedPageSize) {
          this.selectPage(1);
        }
    }

    selectPage(value) {
        this.clearAndSetActivePage(value);
        this.setState({selectedPage: value});
        this.props.pageNumberSelectHandler(Number(value));
    }
    clearAndSetActivePage(value) {
        let allElements = Array.from(document.querySelectorAll('.pokemon_page.active'))
        for (let element of allElements) {
            element.classList.remove('active')
        }
        var element = document.getElementById('pagination_'+ (value));
        element.classList.add("active");
    }

    render() {
        return(
            <div className="paginationContainer">
                <div className="pagination">
                { this.props.pokemonListTotal && this.props.pokemonListTotal == 0 && (<a className="active" href="#">No Data</a>) }
                { this.props.pokemonListTotal > 0 && 
                    <>
                    <a href="#">&laquo;</a>
                    {[...Array(Math.ceil(this.props.pokemonListTotal / this.props.selectedPageSize))].map((e, i) => {
                        return <a id={`pagination_`+(i+1)} className="pokemon_page" key={i+1} onClick={() => this.selectPage(i+1)}>{i+1}</a>
                    })}
                    <a href="#">&raquo;</a>
                    </>
                }
                </div>
            </div>
        );
    }

}

PokemonPagination.propTypes = {
    pokemonListTotal: PropTypes.number,
    selectedPageSize: PropTypes.number,
    pageNumberSelectHandler: PropTypes.func
};