import React, {Component} from 'react';
import {Link} from 'react-router';

export default class HomePage extends Component {
    render() {
        let message = <p>You are currently not logged in. Please, log in or register to view movies.</p>;

        if (sessionStorage.getItem('username')) {
            message = <Link to={"/mymovies/"}>Go to my movies</Link>
        }
        return (
            <div>
                <h1>Home Page</h1>
                {message}
            </div>
        );
    }
}