import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/login.css';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            value: ''
        };
        
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleValueChange = this._handleValueChange.bind(this);
    }
    
    _handleValueChange(evt) {
        this.setState({
            value: evt.target.value
        });
    }

    _handleSubmit(evt) {
        evt.preventDefault();

        if (this.state.value.length < 3) {
            return;
        }

        const loginCommand = {
            command: 'Login',
            userId: this.state.value
        };

        this.props.socket.send(JSON.stringify(loginCommand));
    }

    render() {
        return (
            <div className="login-form">
                <label>You Must Login to Chat</label>
                <form onSubmit={ this.handleSubmit }>
                    <input 
                        onChange={ this.handleValueChange }
                        type="text" 
                        value={ this.state.value } />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        socket: state.app.io
    };
}

export default connect(mapStateToProps)(Login);