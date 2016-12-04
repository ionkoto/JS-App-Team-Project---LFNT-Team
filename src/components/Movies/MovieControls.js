import React, {Component} from 'react';
import {Link} from 'react-router';

export default class MovieControls extends Component {
    render() {
        let edit = null;

        if (this.props.canEdit) edit = <Link to={"/edit/" + this.props.movieId} className="btn btn-default">Edit info</Link>;

        return (
            <div>
                {edit}
            </div>
        )
    }
}