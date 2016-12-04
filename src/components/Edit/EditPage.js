import React, {Component} from 'react';
import EditForm from './EditForm';
import {loadMovieDetails, edit} from '../../models/movie';

export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            summary: '',
            director: '',
            genre: '',
            rating: 0,
            date: null,
            submitDisabled: true
        };
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
        loadMovieDetails(this.props.params.movieId, this.onLoadSuccess);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        this.setState({
            title: response.title,
            summary: response.summary,
            director: response.director,
            genre: response.genre,
            rating: response.rating,
            date: response.date,
            submitDisabled: false
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});
        edit(
            this.props.params.movieId,
            this.state.title,
            this.state.summary,
            this.state.director,
            this.state.genre,
            this.state.rating,
            this.state.date,
            this.onSubmitResponse
        );
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/');
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }

    render() {
        return (
            <div>
                <h1>Edit Page</h1>
                <EditForm
                    title={this.state.title}
                    summary={this.state.summary}
                    director={this.state.director}
                    genre={this.state.genre}
                    rating={this.state.rating}
                    date={this.state.date}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        );
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};