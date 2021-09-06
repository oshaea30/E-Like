import API from "../../API";
import { fetchUsersAction } from "./actions";

const api = new API();

export const fetchUsers = () => {
    return async (dispatch) => {
        return api.getUsers()
            .then((users) => {
                dispatch(fetchUsersAction(users))
            }).catch((error) => {
                alert("Failed to connect API: /users/")
            });
    }
}
