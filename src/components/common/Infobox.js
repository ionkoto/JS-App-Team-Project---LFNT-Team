import React, {Component} from 'react';
import './Infobox.css';
import $ from 'jquery';
import observer from '../../models/observer';
//import LoginPage from '../../components/Login/LoginPage';


export default class Infobox extends Component {
    constructor(props) {
        super(props);
        this.state ={
            message: '',
            style: 'info',
            visible: false
        };
        this.bindEventHandlers();

        // Register in the observer
        observer.showInfo = this.showInfo.bind(this);
        observer.showSuccess = this.showSuccess.bind(this);
        observer.showError = this.showError.bind(this);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.ajaxStart = this.ajaxStart.bind(this);
        this.hide = this.hide.bind(this);
        this.hideError = this.hideError.bind(this);
        this.handleAjaxError = this.handleAjaxError.bind(this);
    }

    componentDidMount() {
        // Attach global AJAX "loading" event handlers
        $(document).on({
            ajaxStart: this.ajaxStart,
            ajaxStop: this.hide,
            ajaxError: this.handleAjaxError
        });
    }

    ajaxStart() {
        this.setState({ message: 'Loading...', style: 'info', visible: true });
    }

    hide() {
        if(this.state.style==='error'){
            this.setState({visible:true})
        }else{
            this.setState({ visible: false });
        }
    }
    hideError(){
        this.setState({ visible: false });
    }

    handleAjaxError(event, response) {
        console.log(response);
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        // if (response.readyState === 4)
        //     errorMsg = "Username / password was incorrect. Please, try again.";
        if (response.responseJSON && response.description)
            console.log(response);
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }

    showInfo(message) {
        this.setState({ message: message, style: 'info', visible: true });
        setTimeout(this.hide, 3000);
    }

    showSuccess(message) {
        this.setState({ message: message, style: 'success', visible: true });
        setTimeout(this.hide, 3000);
    }


    showError(errorMsg) {
        this.setState({ message: errorMsg, style: 'error', visible: true });
    }
    render() {
        if (!this.state.visible) {
            return null;
        }

        let className = 'infobox';
        switch (this.state.style) {
            case 'info':
                className = 'alert alert-dismissible alert-info';
                break;
            case 'error':
                className = 'alert alert-dismissible alert-danger';
                break;
            case 'success':
                className = 'alert alert-dismissible alert-success';
                break;
            default:
                className = 'alert alert-dismissible alert-info';
                break;
        }

        return (
            // {/*<div className={className} onClick={this.hideError}>*/}
            //     {/*<span>*/}
            //         {/*{this.state.message}*/}
            //     {/*</span>*/}
            // {/*</div>*/}
            <div className={className} onClick={this.hideError}>
                <button type="button" className="close" >&times;</button>{this.state.message}
            </div>
        )
    }
}
