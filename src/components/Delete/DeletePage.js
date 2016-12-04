import React, {Component} from 'react';
import {loadMovieDetails, deleteMovie} from '../../models/movie';

export default class DeletePage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', summary: '', director: '', genre: '', rating: 0, date: '', submitDisabled: true};
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onDeleteSubmitHandler = this.onDeleteSubmitHandler.bind(this);
        this.onCancelSubmitHandler = this.onCancelSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount() {
        // Populate form
        loadMovieDetails(this.props.params.movieId, this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        this.setState({
            title: response.title,
            summary: response.summary,
            director: response.director,
            genre: response.genre,
            rating: response.rating,
            date: response.date,
        });
    }

    onDeleteSubmitHandler(event) {
        event.preventDefault();
        deleteMovie(this.props.params.movieId,  this.onSubmitResponse);
    }

    onCancelSubmitHandler(event) {
        event.preventDefault();
        this.context.router.push('/movies/'+this.props.params.movieId);
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/movies');
        } else {
            // Something went wrong, let the user try again
            alert("Error!");
        }
    }

    render() {
        return (
            <div>
                <h1>Delete Movie</h1>
                <p>
                    Are you sure you want to delete <strong>{this.state.title}</strong> from the movies list?
                </p>
                <button className="btn btn-default" onClick={this.onDeleteSubmitHandler} >Delete</button>
                <button className="btn btn-default" onClick={this.onCancelSubmitHandler} >Cancel</button>
            </div>
        );
    }
}

DeletePage.contextTypes = {
    router: React.PropTypes.object
};