import { UPDATE_JOIN_CHAT, SET_CONNECTION, SET_ACTIVE_CHAT } from '../actions/actionTypes';

const _setSocketConnection = (socket) => {
    return {
        type: SET_CONNECTION,
        payload: socket
    };
}

export const setSocketConnection = (socket) => {
    return dispatch => {
        dispatch(_setSocketConnection(socket));
    };
}

const _setActiveChat = (chat) => {
    return {
        type: SET_ACTIVE_CHAT,
        payload: chat
    };
}

export const setActiveChat = (chat) => {
    return dispatch => {
        dispatch(_setActiveChat(chat));
    }
}

const _updateJoinChat = (val) => {
    return {
        type: UPDATE_JOIN_CHAT,
        payload: val
    }
}

export const updateJoinChat = (val) => {
    return dispatch => {
        dispatch(_setActiveChat({}));
        dispatch(_updateJoinChat(val));
    }
}