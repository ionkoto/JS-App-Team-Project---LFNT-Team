import React, {Component} from 'react';
import CreateForm from '../Edit/EditForm';
import {create} from '../../models/movie';
import observer from '../../models/observer';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', summary: '', director: '', genre: '', rating: 0, date: '', image: '', video: '',submitDisabled: false};
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
        if(!this.state.title){
            observer.showError("You can't create a movie without a title");
            this.setState({submitDisabled: false});
        }else{
            create(this.state.title,
                this.state.summary,
                this.state.director,
                this.state.genre,
                Number(this.state.rating),
                this.state.date,
                this.state.image,
                this.state.video,
                this.onSubmitResponse);
        }
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            observer.showSuccess('You successfully created a Movie!');
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
                    director={this.state.director}
                    genre={this.state.genre}
                    rating={this.state.rating}
                    date={this.state.date}
                    image={this.state.image}
                    video={this.state.video}
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