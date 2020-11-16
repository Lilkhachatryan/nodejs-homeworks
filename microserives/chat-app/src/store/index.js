import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers"
import { returnToken } from "../services/helpers";
import { getUser } from "../store/actions/userAction";
import { handleTokenUpdate } from "../store/actions/authAction";

export default function configStore (initialState = {}) {
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    );
    let token = returnToken();

    if (token && !store.getState().login.token) {
        store.dispatch(getUser());
        store.dispatch(handleTokenUpdate(token));
    }

    return store;
}
