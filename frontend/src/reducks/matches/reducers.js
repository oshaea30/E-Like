import * as Actions from './actions';
import  initialState from '../store/initialState';

export const MatchesReducer = (state = initialState.matches, action) => {
    switch(action.type) {
        case Actions.FETCH_MATCHES:
            return {
                ...state,
                list: action.payload.matches.results
            }
        default:
            return state;
    }
}
