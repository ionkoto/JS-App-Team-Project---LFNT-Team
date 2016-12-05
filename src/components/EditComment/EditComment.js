import React, {Component} from 'react';
import EditCommentForm from './EditCommentForm';
import {loadComment, editComment, deleteComment} from '../../models/comment';

export default class EditCommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {commentAuthor: '', commentText: '', movieId: ''};
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
        loadComment(this.props.params.commentId, this.onLoadSuccess);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onEditSubmitHandler = this.onEditSubmitHandler.bind(this);
        this.onDeleteSubmitHandler = this.onDeleteSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        this.setState({
            commentAuthor: response.commentAuthor,
            commentText: response.commentText,
            movieId: response.movieId
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onEditSubmitHandler(event) {
        event.preventDefault();
        editComment(this.props.params.commentId,
            this.state.commentAuthor,
            this.state.commentText,
            this.state.movieId,
            this.onSubmitResponse);
    }

    onDeleteSubmitHandler(event) {
        event.preventDefault();
        deleteComment(this.props.params.commentId,
            this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/movies/' + this.state.movieId);
        } else {
            // Something went wrong, let the user try again
        }
    }


    render() {
        return (
            <div>
                <h1>Edit Comment Page</h1>
                <EditCommentForm
                    commentText={this.state.commentText}
                    onChangeHandler={this.onChangeHandler}
                    onEditSubmitHandler={this.onEditSubmitHandler}
                    onDeleteSubmitHandler={this.onDeleteSubmitHandler}
                />
            </div>
        );
    }
}

EditCommentPage.contextTypes = {
    router: React.PropTypes.object
};