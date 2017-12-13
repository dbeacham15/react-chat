import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSocketConnection, setActiveChat, updateJoinChat } from '../store/actions/app';
import { updateChats, updateChatMessages, setUserInformation, getUserChatCommand, setUserChats } from '../store/actions/user';

import ActiveChat from '../components/ActiveChat';
import Login from '../containers/Login';
import Cell from '../components/ChatCell';
import ChatInput from '../containers/ChatInput';
import JoinChat from '../components/JoinChat';

import '../styles/chat.css';

class Chat extends Component {
    constructor() {
        super();

        this.activateChat = this._activatechat.bind(this);
        this.joinChatHandler = this._joinChatHandler.bind(this);
    }

    _joinChatHandler(evt) {
        this.props.updateJoinChat(true);
    }

    _activatechat(evt) {
        const key = evt.currentTarget.dataset.key;

        this.props.setActiveChat(this.props.chats[key]);
    }

    componentWillMount() {
        const io = new WebSocket('ws://orl1-fumran.tib.ad.ea.com:9000/chat');
        
        io.onopen = () => {
            io.onmessage = (evt) => {
                this._handleMessage(JSON.parse(evt.data));
            }; 

            this.props.setSocketConnection(io);
        }
    }


    _handleMessage(data) {
        switch(data.command) {
            case 'Login' :
                this.props.setUserInformation(data.userId);
                this.props.getUserChatCommand();
            break;
            case 'GetChats' :
                this.props.setUserChats(data.chats);
            break;
            case 'SendMessage' :
                this.props.updateChatMessages(data.message);
            break;
            case 'JoinChat' :
               this.props.updateChats(data.chat, data.chatId);
            break;
            default: 
        }
    }
    
    _renderChats() {
        if (!Object.keys(this.props.chats).length) {
            return (
                <Cell title="No Messages"/>
            )
        }

        return Object.keys(this.props.chats).map(key => {
            const chat = this.props.chats[key];

            return (
                <Cell 
                    handler={ this.activateChat }
                    key={ key }
                    chatKey={ key }
                    users={ chat.users }
                    messages={ chat.messages }
                    active={ this.props.activeChat.id === chat.id }
                    title={ chat.id }/>
            )
        });
    }

    _renderLeftPanel() {
        if (!this.props.authenticated) {
            return;
        }
       
        return (
            <div>
                <div className="right-panel__header">
                    <label>Messages</label>
                    <svg viewBox="0 0 24 24" onClick={ this.joinChatHandler }>
                        <path fill="#000000" d="M18,14H10.5L12.5,12H18M6,14V11.5L12.88,4.64C13.07,4.45 13.39,4.45 13.59,4.64L15.35,6.41C15.55,6.61 15.55,6.92 15.35,7.12L8.47,14M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z" />
                    </svg>
                </div>
                { this._renderChats() }
            </div>
        );
    }

    _renderRightPanel() {
        if (!this.props.authenticated) {
            return <Login />
        } 

        if (Object.keys(this.props.activeChat).length) {
            return (
                <div className="chat-window">
                    <ActiveChat 
                        currentUser={ this.props.userId }
                        messages={ this.props.activeChat.messages }
                    />
                    <ChatInput />
                </div>
            );
        }

        if (this.props.joinChat) {
            return (
                <JoinChat />
            )
        }
    }

    render() {
        return (
            <section className="chat">
                <div className="left-panel">
                    { this._renderLeftPanel() }
                </div>
                <div className="right-panel">
                    { this._renderRightPanel() }
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
        socket: state.app.io,
        chats: state.user.chats,
        activeChat: state.app.activeChat,
        joinChat: state.app.joinChat,
        userId: state.user.userId
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators( { updateChats, updateJoinChat, updateChatMessages, setActiveChat, setSocketConnection, setUserInformation, getUserChatCommand, setUserChats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);