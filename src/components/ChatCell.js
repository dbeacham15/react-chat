import React, { Component } from 'react';

import '../styles/chatCell.css';

export default class ChatCell extends Component {
    _renderProfile() {
        if (this.props.users && this.props.users.length > 2) {
            return (
                <svg viewBox="0 0 24 24">
                    <path fill="#000000" d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />
                </svg>
            )
        }

        return (
            <svg viewBox="0 0 24 24">
                <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
        )
    }

    _renderLastMessage() {
        if (this.props.messages && this.props.messages.length) {
            return this.props.messages[this.props.messages.length - 1].text;
        }

        return '--';
    }

    render() {
        const clsName= this.props.active ? 'chat-cell chat-cell--active' : 'chat-cell';
        
        return (
            <div 
                className={ clsName } 
                data-key={ this.props.chatKey }
                onClick={ this.props.handler }>
                <div className="chat-cell__profile">
                    { this._renderProfile() }
                </div>
                <div className="chat-cell__content">
                    <h5 className="chat-cell__title">{ this.props.title }</h5>
                    <p className="chat-cell__message">{ this._renderLastMessage()}</p>
                </div>
            </div>
        );
    }
}