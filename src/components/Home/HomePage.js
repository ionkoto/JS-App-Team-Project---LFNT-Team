import React, {Component} from 'react';
import {Link} from 'react-router';
import {loadMovies} from '../../models/movie';
import Movie from '../../components/Movies/Movie';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        };
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount() {
        // Request list of movies from the server
        loadMovies(this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        // Process Movies
        let movies = response;
        movies.sort(function(a,b){
            return b.timestamp - a.timestamp;
        });
        //Take the 5 latest added movies
        movies = movies.slice(0,6);
        this.setState({movies: movies})
    }



    render() {
        if (!sessionStorage.getItem('username')) {
            let message = <p>You are currently not logged in. Please, log in or register to view movies.</p>;
            return(
                <div>{message}</div>
            )
        }

        else if (sessionStorage.getItem('username')) {
            let message = <Link to={"/mymovies/"}>Go to my movies</Link>
        }
        return (
            <div>
                <h1>Last added: </h1>
                    {this.state.movies.map((e, i) => {
                        return <Movie key={i}
                                      id={e._id}
                                      title={e.title}
                                      summary={e.summary}
                                      director={e.director}
                                      genre={e.genre}
                                      rating={e.rating}
                                      date={e.date}/>
                    })}
            </div>
        );
    }
}