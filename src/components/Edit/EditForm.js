import React, {Component} from 'react';

export default class EditForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={this.props.title}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Summary:</label>
                    <textarea
                        className="form-control"
                        name="summary"
                        value={this.props.summary}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Director:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="director"
                        value={this.props.director}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Genre:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="genre"
                        value={this.props.genre}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Rating:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="rating"
                        value={this.props.rating}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="date"
                        value={this.props.date}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>

                <input className="btn btn-default" type="submit" value="Submit changes" disabled={this.props.submitDisabled}/>
            </form>
        );
    }
}