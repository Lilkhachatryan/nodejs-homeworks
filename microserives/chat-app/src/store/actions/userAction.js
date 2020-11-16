import { getUserService } from "../../services/endpoints";

const setUser = (user) => ({
    type: 'USER_FETCH_SUCCESS',
    payload: user
});

export const getUser = () => {
    return (dispatch) => {
        getUserService().then(({ data }) => {
            dispatch(setUser(data))
        })
    }
};
