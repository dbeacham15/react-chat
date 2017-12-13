import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: '',
    authenticated: false,
    chats: {}
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_USER :
            return {
                ...state,
                userId: action.payload,
                authenticated: true
            }
        case actionTypes.SET_USER_CHATS :
            return {
                ...state,
                chats: action.payload
            }
        default: 
            return state;
    }
}