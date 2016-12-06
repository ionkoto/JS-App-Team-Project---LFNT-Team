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
        if (sessionStorage.getItem('username'))
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
        let message = '';
        if (!sessionStorage.getItem('username')) {
            message = <p>You are currently not logged in. Please, <Link to={"/login"}>log in</Link> or <Link to={"/register"}>register</Link> to view movies.</p>;
            return(
                <div>{message}</div>
            )
        }

        else if (sessionStorage.getItem('username')) {
            message = <Link to={"/mymovies/"} className="btn btn-info">Go to my movies</Link>
        }
        return (
            <div>
                <div>{message}</div>
                <h1>Last added: </h1>
                    {this.state.movies.map((e, i) => {
                        return (
                        <div key={i}>
                                <article className="post col-md-6" key={i}>
                                    <h3>{e.title}</h3>
                                    <div className="about">
                                        <b>Director: </b> <i>{e.director}</i><br/><b>Genre: </b><i>{e.genre}</i><br/><b>Rating (0/10): </b> <i>{e.rating}</i><br/><b>Release Date: </b><i>{e.date}</i>
                                    </div>
                                    <div className="body"><b>Summary: </b> <i>{e.summary}</i></div>

                                    <div className="post">
                                        <b>Poster</b><br/>
                                        {(e.image !== "" )?<img src={e.image}/>:<div>Poster missing</div>}
                                    </div>


                                </article>
                        </div>
                        );
                    })}

            </div>
        );
    }
};