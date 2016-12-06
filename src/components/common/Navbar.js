import React, {Component} from 'react';

export default class Navbar extends Component {
    render() {
        return (
                <ul className="nav navbar-nav">
                {this.props.children}
                </ul>
        );
    }
}