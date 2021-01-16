import { combineReducers } from 'redux';
import { users } from "./usersReducer";
import { login, register } from "./authReducers";

export default combineReducers({
    user: users,
    login,
    register
});
