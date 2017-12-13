import * as actionTypes from '../actions/actionTypes';

const _setUserInformation = ( userId ) => {
    return {
        type: actionTypes.SET_USER,
        payload: userId
    }
}

export const setUserInformation = (userId) => {
    return (dispatch, getState) => {
        dispatch(_setUserInformation(userId));
    }
}

export const getUserChatCommand = () => {
    return (dispatch, getState) => {
        const command = {
            command: 'GetChats',
            userId: getState().user.userId
        };

        getState().app.io.send(JSON.stringify(command));
    }
}

const _setUserChats = (chats) => {
    return {
        type: actionTypes.SET_USER_CHATS,
        payload: chats
    };
}

export const setUserChats = (chats) => {
    return dispatch => {
        dispatch(_setUserChats(chats));
    }
}

const _updateChats = (chats) => {
    return { 
        type: actionTypes.SET_USER_CHATS,
        payload: chats
    };
}
export const updateChatMessages = (msg) => {
    return (dispatch, getState) => {
        const obj = getState().user.chats;

        const newObj = {
            ...obj,
        }
        
        newObj[msg.chatId].messages.push(msg);
        

        dispatch(_updateChats(newObj));
    };
}

export const updateChats = (chat, id) => {
    return (dispatch, getState ) => {

        const obj = getState().user.chats;
        const newObj = {
            ...obj
        };

        newObj[id] = chat;

        dispatch(_updateChats(newObj));
    }
}