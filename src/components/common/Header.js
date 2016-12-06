import React, {Component} from 'react';
import Greeting from '../common/Greeting';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                        </button>
                        <span className="navbar-brand text-justify">Movie Database</span>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        {this.props.children}
                        <Greeting user={this.props.user}/>
                    </div>
                </div>
            </nav>
        );
    }
}