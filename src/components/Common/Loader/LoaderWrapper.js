import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Loader.less';

// const LoaderWrapper = withRouter(props => {
class LoaderWrapper extends React.Component {
    render() {
        if(this.props.isFinishedLoading) {
            return (
                <div>{this.props.children}</div>
            ); 
        }
        return (
            <div className="wrapper">
                <div id='loader'>
                    <div id="top"></div>
                    <div id="center"></div>
                    <div id="bottom"></div>
                </div>
            </div>
        );
    }
}

export default LoaderWrapper;