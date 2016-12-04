import React, {Component} from 'react';
import Movie from './Movie';
import {loadMovies} from '../../models/movie';
import {Link} from 'react-router';
//import observer from '../../models/observer';

export default class CatalogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        // Display movies
        this.setState({movies: response})
    }

    componentDidMount() {
        // Request list of movies from the server
        loadMovies(this.onLoadSuccess);
    }

    render() {
        let createLink = null;
        if (!sessionStorage.getItem('movieId')) {
            createLink = <Link to="/create" className="btn btn-default">Create movie</Link>
        }

        return (
            <div>
                <h1>Catalog Page</h1>
                {createLink}
                <div>
                    {this.state.movies.map((e, i) => {
                        return <Movie key={i} name={e.name} id={e._id} description={e.comment}/>
                    })}
                </div>
            </div>
        );
    }
}