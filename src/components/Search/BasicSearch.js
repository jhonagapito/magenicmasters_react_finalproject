import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BasicSearch extends Component {
    constructor()
    {
        super();
        this.state = {
            searchText: ""
        };
        
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    onChange(event)
    {
        this.setState({searchText: event.target.value});
        this.props.onSearchTextChange(event.target.value);
    }
    onClear() {
        this.setState({searchText: ""});
        this.props.onSearchTextChange("");
        this.props.onClear();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="search-criteria">
                        <div>Pokemon Name:</div>
                        <input type="text" className="form-control" placeholder="Basic Search" onChange={(event) => this.onChange(event)} value={this.state.searchText} />
                    </div>
                </div>
                
                { !this.props.isAdvancedSearch && this.state.searchText!="" &&
                <div className="col-sm-12">
                    <div className="btn-group" role="group">
                        <button className="btn btn-danger" onClick={this.props.searchHandler}>Search</button>
                        <button className="btn btn-danger" onClick={this.onClear}>Clear</button>
                    </div>
                </div>
                }
            </div>
            );
    }
}

BasicSearch.propTypes = {
    searchHandler: PropTypes.func.isRequired,
    onSearchTextChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    isAdvancedSearch: PropTypes.bool
};

export default BasicSearch;