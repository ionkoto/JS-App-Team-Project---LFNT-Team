import React, {Component} from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import Infobox from  './components/common/Infobox';
import {Link} from 'react-router';
import observer from './models/observer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, username: '' };
        observer.onSessionUpdate = this.onSessionUpdate.bind(this);
    }

    componentDidMount() {
        this.onSessionUpdate();
    }

    onSessionUpdate() {
        let name = sessionStorage.getItem("username");
        if (name) {
            this.setState({ loggedIn: true, username: sessionStorage.getItem("username") });
        } else {
            this.setState({ loggedIn: false, username: '' });
        }
    }

    render() {
        let navbar = {};
        if (!this.state.loggedIn) {
            navbar = (
                    <Navbar className="nav navbar-nav">
                        <li><Link to="/"  onlyActiveOnIndex={true}>Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/login" >Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </Navbar>
                );
        } else {
            navbar = (
                <Navbar className="nav navbar-nav">
                    <li><Link to="/"  onlyActiveOnIndex={true}>Home</Link></li>
                    <li><Link to="/movies" >Movies</Link></li>
                    <li><Link to="/about" >About</Link></li>
                    <li><Link to="/logout" >Logout</Link></li>
                </Navbar>
            );
        }

        return (
            <div>
                <Header loggedIn={this.state.loggedIn} user={this.state.username}>
                    {navbar}
                </Header>
                <div className="root" id="body">
                    <div className="container">
                        {this.props.children}
                        <Infobox/>
                    </div>
                </div>
                <div className="navbar navbar-inverse navbar-fixed-bottom" id="footer">
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default App;
