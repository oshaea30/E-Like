import * as Actions from './actions';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.FETCH_USERS:
            return {
                ...state,
                list: action.payload.results
            }
        case Actions.SIGN_UP:
            return {
                ...state,
                current_user: action.payload,
            };
        case Actions.SIGN_IN:
            return {
                ...state,
                current_user: action.payload,
            };
        case Actions.REMOVE_USER:
            return {
                ...state,
                current_user: action.payload,
            };
        default:
            return state;
    }
}
