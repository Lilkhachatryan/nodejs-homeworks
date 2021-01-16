import * as actionTypes from './actionTypes';
import { setStorage } from "../../services/storage";
import { removeToken } from "../../services/helpers";

// register user

export function registerUser() {
    return {
        type: actionTypes.REGISTER_USER
    };
}

export function registerUserSuccess() {
    return {
        type: actionTypes.REGISTER_USER_SUCCESS
    };
}

export function registerUserFail(payload) {
    return {
        type: actionTypes.REGISTER_USER_FAIL,
        payload
    };
}

// Login user

export function loginUser() {
    return {
        type : actionTypes.LOGIN_USER
    };
}

export function loginUserSuccess(payload) {
    return {
        type: actionTypes.LOGIN_USER_SUCCESS,
        payload
    };
}

export function loginUserFail (payload) {
    return {
        type: actionTypes.LOGIN_USER_FAIL,
        payload
    };
}

export function logoutSuccess (payload) {
    return {
        type: actionTypes.LOG_OUT,
        payload
    };
}

export function handleLogin (data) {
    return (dispatch) => {
        const { token } = data;
        setStorage('localStorage', 'token', token);
        dispatch(loginUserSuccess(token));
    };
}

export function handleLogOut () {
    return (dispatch) => {
        removeToken();
        dispatch(logoutSuccess());
    };
}

export function handleTokenUpdate (token = null) {
    return (dispatch) => {
        dispatch(logoutSuccess(token));
    };
}
