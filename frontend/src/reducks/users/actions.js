export const FETCH_USERS = "FETCH_USERS";
export const fetchUsersAction = (users) => {
    return {
        type: "FETCH_USERS",
        payload: users
    }
}

export const SIGN_UP = "SIGN_UP";
export const signUpAction = (user) => {
  return {
    type: "SIGN_UP",
    payload: user,
  };
};

export const SIGN_IN = "SIGN_IN";
export const signInAction = (user) => {
  return {
    type: "SIGN_IN",
    payload: user,
  };
};