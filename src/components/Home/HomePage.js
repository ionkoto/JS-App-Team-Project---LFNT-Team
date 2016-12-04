import React, {Component} from 'react';
import {Link} from 'react-router';

export default class HomePage extends Component {
    render() {
        let message = <p>You are currently not logged in. Please, log in or register to view movies.</p>;

        if (sessionStorage.getItem('username')) {
            if (sessionStorage.getItem('movieId')!=='undefined') {
                message = <Link to={"/movies/" + sessionStorage.getItem('movieId')}>Go to my movies</Link>
            } else {
                message = <p>You haven't created any movies yet. Go to <Link to="/movies">movies</Link> to create one.</p>;
            }
        }
        return (
            <div>
                <h1>Home Page</h1>
                {message}
            </div>
        );
    }
}