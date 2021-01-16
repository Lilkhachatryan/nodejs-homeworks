import * as actionTypes from '../actions/actionTypes';

const initialRegisterState = {
    loading: false,
    loaded: false,
    error: ''
};

const initialLoginState = {
    loading: false,
    loaded: false,
    error: '',
    token: null
};


export function register(state = initialRegisterState, action) {
    switch (action.type) {
        case actionTypes.REGISTER_USER: {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: ''
            };
        }
        case actionTypes.REGISTER_USER_SUCCESS: {
            return {
                loading: false,
                loaded: true,
                error: ''

            };
        }
        case actionTypes.REGISTER_USER_FAIL: {
            return {
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        default : return state;
    }
}


export function login(state = initialLoginState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER: {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: '',
                token: null
            };
        }
        case actionTypes.LOGIN_USER_SUCCESS: {
            return {
                loading: false,
                loaded: true,
                error: '',
                token: action.payload
            };
        }
        case actionTypes.LOGIN_USER_FAIL: {
            return {
                loading: false,
                loaded: false,
                error: action.payload,
                token: null
            };
        }
        case actionTypes.LOG_OUT: {
            return {
                ...state,
                token: action.payload
            };
        }
        default : return state;
    }
}
