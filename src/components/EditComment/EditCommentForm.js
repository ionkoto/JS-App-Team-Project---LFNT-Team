import React, {Component} from 'react';


export default class EditCommentForm extends Component {

    render() {
        return(
            <div>
                <textarea className="form-control"
                          name="commentText"
                          value={this.props.commentText}
                          onChange={this.props.onChangeHandler}
                />
                <button className="btn btn-success"  onClick={this.props.onEditSubmitHandler}>Edit Comment</button>
                <button className="btn btn-warning"  onClick={this.props.onDeleteSubmitHandler}>Delete Comment</button>
            </div>
        )
    }
}

