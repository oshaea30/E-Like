import * as actions from './actions';
import  initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
    switch(action.type) {
        case actions.FETCH_USERS:
            return {
                ...state,
                list: action.payload.results
            }
        default:
            return state;
    }
}