import { UPDATE_JOIN_CHAT, SET_CONNECTION, SET_ACTIVE_CHAT } from '../actions/actionTypes';

const initialState = {
    io: {},
    activeChat: {},
    joinChat: false
};

export default function app(state = initialState, action) {
    switch(action.type) {
        case SET_CONNECTION :
            return {
                ...state,
                io: action.payload
            }
        case SET_ACTIVE_CHAT :
            return {
                ...state,
                activeChat: action.payload
            }
        case UPDATE_JOIN_CHAT :
            return {
                ...state,
                joinChat: action.payload
            }
        default: 
            return state;
    }
}