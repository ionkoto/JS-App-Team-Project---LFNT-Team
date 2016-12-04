import React, {Component} from 'react';
import {Link} from 'react-router';
import './Movie.css';

export default class Movie extends Component {

    render() {
        return(
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.summary || 'No summary'}</td>
                <td>{this.props.director || 'No director'}</td>
                <td>{this.props.genre || 'No genre'}</td>
                <td>{this.props.rating || 'No rating'}</td>
                <td>{this.props.date || 'No date'}</td>
                <Link to={"/movies/" + this.props.id} className="btn btn-group-sm">Details</Link>
            </tr>
        )
    }
}

