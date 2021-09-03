export const FETCH_USERS = "FETCH_USERS";
export const fetchUsersAction = (users) => {
    return {
        type: "FETCH_USERS",
        payload: users
    }
}