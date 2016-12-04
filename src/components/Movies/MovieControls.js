import React, {Component} from 'react';
import {Link} from 'react-router';

export default class MovieControls extends Component {
    render() {
        let edit = null;


        if (this.props.canEdit) edit = <div><Link to={"/edit/" + this.props.movieId} className="btn btn-default">Edit info</Link> <Link to={"/delete/" + this.props.movieId} className="btn btn-default">Delete movie</Link></div>;

        return (
            edit
        )
    }
}