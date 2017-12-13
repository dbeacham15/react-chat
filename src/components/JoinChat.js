import React, { Component } from 'react';
import { connect } from 'react-redux';


class JoinChat extends Component {
    constructor() {
        super();

        this.state = {
            value: ''
        };
    }

    handleSubmit(evt) {
        evt.preventDefault();

        this.setState({
            value: ''
        });

        const command = {
            command: 'JoinChat',
            chatId: this.state.value,
            userId: this.props.userId
        };

        this.props.io.send(JSON.stringify(command));
    }

    handleValueStateChange(evt) {
        this.setState({
            value: evt.target.value
        });
    }

    render() {
        return (
            <div className="join-chat">
                <label>Enter the Group name to Join Chat</label>
                <form className="join-chat__form" onSubmit={ this.handleSubmit.bind(this) }>
                    <input type="text" value={ this.state.value } onChange={ this.handleValueStateChange.bind(this) } />
                    <input type="submit" value="Join" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        io: state.app.io,
        userId: state.user.userId
    };
}

export default connect(mapStateToProps)(JoinChat);