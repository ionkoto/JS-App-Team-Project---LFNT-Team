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
            message = <p>Please, <Link to={"/login"}><strong>log in</strong></Link> or <Link to={"/register"}><strong>register</strong></Link> to proceed.</p>;
            return(
                <div className="jumbotron">
                    <h1>Welcome to LFNT Movie Database</h1>
                    <h3>{message}</h3>
                    <p><Link to={"/about"} className="btn btn-primary btn-lg">Learn more</Link></p>
                </div>
            )
        }

        else if (sessionStorage.getItem('username')) {
            message = <Link to={"/mymovies/"} className="btn btn-info">Go to my movies</Link>
        }
        return (
            <div>
                <div>{message}</div>
                <h3>Latest:</h3>
                    {this.state.movies.map((e, i) => {
                        return (
                        <div key={i} className="post col-md-6">
                                <article className="alert alert-dismissible alert-info" key={i}>
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