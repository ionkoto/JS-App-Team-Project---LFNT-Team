import React, {Component} from 'react';

export default class RegisterForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        value={this.props.username}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={this.props.password}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Repeat Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="repeat"
                        value={this.props.repeat}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group" hidden={this.props.hidden}>
                    <div className="alert alert-dismissible alert-danger">
                        <strong>Your username and password need to be at least 3 symbols long</strong>
                    </div>
                </div>
                <input className="btn btn-default" type="submit" value="Register" disabled={this.props.submitDisabled}/>
            </form>
        );
    }
}