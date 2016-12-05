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
                <label>Rating (1/10):</label>
                    <select
                        className="form-control"
                        name="rating"
                        value={this.props.rating}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Release date:</label>
                    <div className='input-group date' id='datetimepicker'>
                        <input
                            className="form-control"
                            type="date"
                            name="date"
                            value={this.props.date}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Poster:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="image"
                        value={this.props.image}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Trailer:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="video"
                        value={this.props.video}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <input className="btn btn-default" type="submit" value="Submit changes" disabled={this.props.submitDisabled}/>
            </form>
        );
    }
}