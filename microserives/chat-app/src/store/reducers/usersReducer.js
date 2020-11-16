import { USER_FETCH_SUCCESS } from "../actions/actionTypes"

export function users (state = {}, action) {
    switch (action.type) {
        case USER_FETCH_SUCCESS:
            return action.payload || {};
        default:
            return state;
    }

}
