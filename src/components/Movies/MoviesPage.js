import React, {Component} from 'react';
import Movie from './Movie';
import {loadMovies} from '../../models/movie';
import {Link} from 'react-router';
//import observer from '../../models/observer';

export default class MoviesPage extends Component {
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
        let createLink =
            <Link to="/create" className="btn btn-default">Create movie</Link>;


        return (
            <div>
                <h1>Movies Page</h1>
                {createLink}
                <div>
                    {this.state.movies.map((e, i) => {
                        return <Movie key={i} title={e.title} id={e._id} summary={e.summary}/>
                    })}
                </div>
            </div>
        );
    }
}