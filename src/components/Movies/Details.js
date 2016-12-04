import React, {Component} from 'react';
import {loadMovieDetails, loadUsersDetails} from '../../models/movie';
import {joinMovie, leaveMovie} from '../../models/user';
import MovieControls from './MovieControls';
import './Details.css';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name: '',
            description: '',
            members: [],
            canEdit: false,
            ownMovie: sessionStorage.getItem('movieId') === this.props.params.movieId
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onUsersSuccess = this.onUsersSuccess.bind(this);
        this.onJoin = this.onJoin.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.statusChange = this.statusChange.bind(this);
    }

    onJoin(event) {
        event.preventDefault();
        joinMovie(this.props.params.movieId, this.statusChange);
    }

    onLeave(event) {
        event.preventDefault();
        leaveMovie(this.statusChange);
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
            name: response.name,
            description: response.comment
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

    render() {
        let title = 'Movie details';
        if (this.state.name !== '') {
            title = this.state.name + ' details';
        }

        let members = <p>No member info</p>;
        if (this.state.members.length > 0) {
            members = (
            <div>
                {this.state.members.map((e, i) => <span key={i} className="member">{e.username}</span>)}
            </div>
            );
        }

        return (
            <div className="details-box">
                <span className="titlebar">{title}</span>
                <span className="spanner">Movie members</span>
                {members}
                <span className="spanner">Description</span>
                <p>{this.state.description || 'No description'}</p>
                <span className="spanner">Movie management</span>
                <MovieControls
                    movieId={this.props.params.movieId}
                    onJoin={this.onJoin}
                    onLeave={this.onLeave}
                    canEdit={this.state.canEdit}
                    ownMovie={this.state.ownMovie}
                />
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};