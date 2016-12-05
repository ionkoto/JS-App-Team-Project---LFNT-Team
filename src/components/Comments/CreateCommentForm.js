import React, {Component} from 'react';
import {Link} from 'react-router';


export default class Comment extends Component {

    render() {
        return(
            <div>
                <textarea className="form-control"
                          name="newCommentText"
                          value={this.props.newCommentText}
                          onChange={this.props.onChangeHandler}
                />
                <button className="btn btn-default"  onClick= {this.props.createComment} disabled={this.props.addCommentDisabled}>Add Comment</button>
            </div>
        )
    }
}
