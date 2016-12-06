import React, {Component} from 'react';
import {Link} from 'react-router';


export default class Comment extends Component {

    render() {
        return(
            <blockquote className="panel panel-default">
                <p className="panel-body">{this.props.commentText}</p>
                <small className="panel-footer">{this.props.commentAuthor}</small>
                {
                    (this.props.creator === sessionStorage.getItem('userId'))? <Link to={"/editComment/" + this.props.id} className="btn btn-default">Edit/Delete Comment</Link> : null
                }
            </blockquote>
        )
    }
}