import React, {Component} from 'react';
import {loadMovieDetails, loadUsersDetails} from '../../models/movie';
import {loadComments, create} from '../../models/comment';
import MovieControls from './MovieControls';
import Comment from '../Comments/Comment';
import CreateCommentForm from '../Comments/CreateCommentForm';
import './Details.css';



export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: '',
            summary: '',
            director: '',
            genre: '',
            rating: 0,
            date: '',
            image: '',
            video: '',
            comments:[],
            newCommentText: '',
            addCommentDisabled: true,
            canEdit: false,
            ownMovie: sessionStorage.getItem('movieId') === this.props.params.movieId
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onUsersSuccess = this.onUsersSuccess.bind(this);
        this.onCommentSuccess = this.onCommentSuccess.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitCommentResponse = this.onSubmitCommentResponse.bind(this);
        this.createComment = this.createComment.bind(this);
    }


    statusChange(response) {
        this.context.router.push('/');
    }

    componentDidMount() {
        loadMovieDetails(this.props.params.movieId, this.onLoadSuccess);
        loadUsersDetails(this.props.params.movieId, this.onUsersSuccess);
        loadComments(this.props.params.movieId, this.onCommentSuccess);
    }

    onLoadSuccess(response) {
        let newState = {
            title: response.title,
            summary: response.summary,
            director: response.director,
            genre: response.genre,
            rating: response.rating,
            date: response.date,
            image: response.image,
            video: response.video
        };
        if (response._acl.creator === sessionStorage.getItem('userId')) {
            newState.canEdit = true;
        }
        this.setState(newState);
    }

    onUsersSuccess(response) {
        this.setState({
            members: response
        });
    }

    onCommentSuccess (response) {
        this.setState({
            comments: response
        });

    }

    createComment (event) {
        event.preventDefault();
        this.setState({addCommentDisabled:  true});
        create(sessionStorage.getItem("username"), this.state.newCommentText, this.props.params.movieId, this.onSubmitCommentResponse)

    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        if(event.target.value !== ''){
            this.setState({addCommentDisabled:  false})
        }else{
            this.setState({addCommentDisabled:  true})
        }
        this.setState(newState);
    }

    onSubmitCommentResponse(response) {
        setTimeout((function(){if (response === true) {
            // reload the page
            loadComments(this.props.params.movieId, this.onCommentSuccess);
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: false});
        }}).bind(this),1000)

    }


    render() {

        return (
            <div className="details-box">
                <span className="titlebar">{this.state.title}</span>
                <img src={this.state.image} role="presentation"/>
                <span className="spanner">Summary</span>
                <p>{this.state.summary || 'No description'}</p>
                <span className="spanner">Director</span>
                <p>{this.state.director || 'Unknown director'}</p>
                <span className="spanner">Genre</span>
                <p>{this.state.genre || 'Unknown genre'}</p>
                <span className="spanner">Rating</span>
                <p>{this.state.rating || 'No rating'}</p>
                <span className="spanner">Release date</span>
                <p>{this.state.date || 'Unknown release date'}</p>
                <span className="spanner">Trailer</span>
                {(this.state.video)?<iframe width="320" height="240" src={this.state.video}></iframe> : <p>No trailer available</p>}
                <MovieControls
                    movieId={this.props.params.movieId}
                    canEdit={this.state.canEdit}
                />
                <span className="spanner">Comments</span>
                {(this.state.comments.length !== 0)?this.state.comments.map((c, i) => {
                    return <Comment key={i}
                                    index={i}
                                    id={c._id}
                                    creator={c._acl.creator}
                                    commentText={c.commentText}
                                    commentAuthor={c.commentAuthor}
                                    commentClick={this.commentClick}
                    />
                }) : <p>No comments yet</p>
                }
                <span className="spanner">Add Comment</span>
                <CreateCommentForm
                    onChangeHandler={this.onChangeHandler}
                    addCommentDisabled={this.state.addCommentDisabled}
                    createComment={this.createComment}
                />
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};