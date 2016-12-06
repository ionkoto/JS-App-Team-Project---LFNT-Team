import React, {Component} from 'react';


export default class CreateCommentForm extends Component {

    render() {
        return(
            <div>
                <textarea className="form-control"
                          name="newCommentText"
                          value={this.props.newCommentText}
                          onChange={this.props.onChangeHandler}
                />
                <button className="btn btn-success"  onClick= {this.props.createComment} disabled={this.props.addCommentDisabled}>Add Comment</button>
            </div>
        )
    }
}
