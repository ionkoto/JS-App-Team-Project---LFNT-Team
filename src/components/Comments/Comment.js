import React, {Component} from 'react';
import {Link} from 'react-router';


export default class Comment extends Component {

    render() {
        return(
            <div>
                <p>{this.props.commentText}</p>
                <p>{this.props.commentAuthor}</p>
            </div>
        )
    }
}