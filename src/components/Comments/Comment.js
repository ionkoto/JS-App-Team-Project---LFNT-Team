import React, {Component} from 'react';
import {Link} from 'react-router';


export default class Comment extends Component {

    render() {
        return(
            <div className="panel panel-default">
                <p className="panel-body">{this.props.commentText}</p>
                <p className="panel-footer">{this.props.commentAuthor}</p>
                {
                    (this.props.creator === sessionStorage.getItem('userId'))? <Link to={"/editComment/" + this.props.id} className="btn btn-default">Edit/Delete Comment</Link> : null
                }
            </div>
        )
    }
}