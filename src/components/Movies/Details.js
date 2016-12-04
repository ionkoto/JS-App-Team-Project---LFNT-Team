import React, {Component} from 'react';
import {loadMovieDetails, loadUsersDetails} from '../../models/movie';
import MovieControls from './MovieControls';
import './Details.css';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: '',
            summary: '',
            director: '',
            genre: '',
            rating:0,
            date: null,
            canEdit: false,
            ownMovie: sessionStorage.getItem('movieId') === this.props.params.movieId
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onUsersSuccess = this.onUsersSuccess.bind(this);
        this.statusChange = this.statusChange.bind(this);
    }

    statusChange(response) {
        this.context.router.push('/');
    }

    componentDidMount() {
        loadMovieDetails(this.props.params.movieId, this.onLoadSuccess);
        loadUsersDetails(this.props.params.movieId, this.onUsersSuccess);
    }

    onLoadSuccess(response) {
        let newState = {
            title: response.title,
            summary: response.summary,
            director: response.director,
            genre: response.genre,
            rating: response.rating,
            date: response.date
        };
        if (response._acl.creator === sessionStorage.getItem('userId')) {
            newState.canEdit = true;
        }
        this.setState(newState);
    }

    render() {
        let title = 'Movie details';
        if (this.state.title !== '') {
            title = '\"' + this.state.title + '\"';
        }

        return (
            <div className="details-box">
                <span className="titlebar">{title}</span>
                <span className="spanner">Summary</span>
                <p>{this.state.summary || 'No summary'}</p>
                <span className="spanner">Director</span>
                <p>{this.state.director || 'No director'}</p>
                <span className="spanner">Genre</span>
                <p>{this.state.genre || 'No genre'}</p>
                <span className="spanner">Rating</span>
                <p>{this.state.rating || 'No rating'}</p>
                <span className="spanner">Date</span>
                <p>{this.state.date || 'No date'}</p>
                <MovieControls
                    movieId={this.props.params.movieId}
                    canEdit={this.state.canEdit}
                    ownTeam={this.state.ownMovie}
                />
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};