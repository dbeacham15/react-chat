import React, { Component } from 'react';

import '../styles/activeChat.css';

class ActiveChat extends Component {

     animateScroll(duration, someElement) {
        const start = someElement.scrollTop;
        const end = someElement.scrollHeight;
        const change = end - start;
        const increment = 20;

        const easeInOut = (currentTime, start, change, duration) => {
          // by Robert Penner
          currentTime /= duration / 2;
          if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
          }
          currentTime -= 1;
          return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
        }

        const animate = (elapsedTime) => {
          elapsedTime += increment;
          var position = easeInOut(elapsedTime, start, change, duration);
          someElement.scrollTop = position;
          if (elapsedTime < duration) {
            setTimeout(function() {
              animate(elapsedTime);
            }, increment)
          }
        }

        animate(0);
      }

    componentDidMount() {
        const container = document.querySelector('.active-chat');
        const observer = new MutationObserver(() => {
            this._scrollToBottom();
        });

        observer.observe(container, { childList: true });

        this._scrollToBottom();
    }

    _getFirstNameLetter(userName) { console.log(userName);
        try {
            return userName.subString(0,1);
        } catch (err) {
            return '';
        }
    }

    _renderProfileAsset(current) {
        if (!current) {
            return 'http://www.clker.com/cliparts/5/7/4/8/13099629981030824019profile.svg.hi.png';
        }
        return 'http://vivamanchester.co.uk/wp-content/uploads/2015/12/b640x600.jpg';
    }   


    _generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    _formatTimestamp(date) {
        const timestamp = Date.parse(date);
        const currentTime = new Date().getTime();

        const minsAgo = (currentTime - timestamp) / 60000;

        if (minsAgo < 1) {
            return 'Now';
        }
        if ( minsAgo < 60) {
            return `${Math.floor(minsAgo)} mins ago`;
        }

        const hoursAgo = minsAgo / 60;

        if (hoursAgo < 24) {
            return `${Math.floor(hoursAgo)} hr(s) ago`;
        }    
    }

    _scrollToBottom(evt) {
        const container = document.querySelector('.active-chat');

        this.animateScroll(300, container);
    }

    _renderChats() {
        return this.props.messages.map(message => {
            let clsName = 'active-message';
            let current = false;

            if (message.senderId === this.props.currentUser) {
                clsName = `${clsName} active-message--current`;
                current = true;
            }

            return (
                <div className={ clsName } key={ this._generateKey() }>
                    <div className="active-chat__message">
                        <div className="active-chat__message-author" title={ message.senderId }>
                            <img src={ this._renderProfileAsset(current) } alt="" />
                        </div>
                        <p className="active-chat__message-text">
                            { message.text }
                        </p>
                    </div>
                    <label className="active-chat__message-timestamp">
                        <span>{ message.senderId }</span> | { this._formatTimestamp(message.timestamp) }
                    </label>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="active-chat">
                { this._renderChats() }
            </div>
        )
    }
}

export default ActiveChat;