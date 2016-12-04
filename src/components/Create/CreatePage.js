import React, {Component} from 'react';
import CreateForm from '../Edit/EditForm';
import {create} from '../../models/movie';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', summary: '', director: '', genre: '', rating: 0, date: '', submitDisabled: false};
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
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
        create(this.state.title, this.state.summary, this.state.director, this.state.genre, this.state.rating, this.state.date, this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/movies');
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }

    render() {
        return (
            <div>
                <h1>Create Page</h1>
                <CreateForm
                    title={this.state.title}
                    summary={this.state.summary}
                    director  ={this.state.director}
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

CreatePage.contextTypes = {
    router: React.PropTypes.object
};