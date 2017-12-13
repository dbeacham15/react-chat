import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/chatInput.css';

class ChatInput extends Component {
    constructor() {
        super();

        this.state = {
            value: ''
        };
    }

    handleSubmit(evt) {
        evt.preventDefault();

       if (!this.state.value.length) {
           return;
       }

       const sendMessageCommand = {
           command: 'SendMessage',
           message: {
                senderId: this.props.userId,
                chatId: this.props.activeChat.id,
                text: this.state.value,
                gameInfo: {
                    id: 'web-client'
                }
           }
       };

       this.props.io.send(JSON.stringify(sendMessageCommand));

       // Clear the Text input after submitting
       this.setState({
           value: ''
       });;
    }

    handleValueChange(evt) {
        this.setState({
            value: evt.target.value
        })
    }

    render() {
        return (
            <form className="chat-input" onSubmit={ this.handleSubmit.bind(this) }>
                <input 
                    className="chat-input__text"
                    placeholder="Type a message..."
                    onChange={ this.handleValueChange.bind(this) }
                    type="text" 
                    value={ this.state.value } />
                <input className="chat-input__submit" type="submit" value="chat" />
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        io: state.app.io,
        activeChat: state.app.activeChat,
        userId: state.user.userId
    };
}

export default connect(mapStateToProps)(ChatInput);