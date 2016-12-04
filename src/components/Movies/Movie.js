import React, {Component} from 'react';
import {Link} from 'react-router';
import './Movie.css';

export default class Movie extends Component {
    render() {
        return(
            <Link to={"/movies/" + this.props.id} className="movie-box">
                <span className="spanner">Title</span>
                <span className="title">{this.props.title}</span>
                <span className="spanner">Summary</span>
                <p>{this.props.summary || 'No summary'}</p>
                <span className="spanner">Director</span>
                <p>{this.props.director || 'No director'}</p>
                <span className="spanner">Genre</span>
                <p>{this.props.genre || 'No genre'}</p>
                <span className="spanner">Rating</span>
                <p>{this.props.rating || 'No rating'}</p>
                <span className="spanner">Release Date</span>
                <p>{this.props.date || 'No date'}</p>
            </Link>
        )
    }
}