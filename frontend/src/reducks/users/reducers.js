import * as Actions from './actions';
import initialState from '../store/initialState';

export const UserReducer = (state = initialState.user, action) => {
	switch (action.type) {
		case Actions.SIGN_UP:
			return {
				...state,
				...action.payload.user,
			};
		case Actions.SIGN_IN:
			return {
				...state,
				...action.payload.user,
			};
		default:
			return state;
	}
};
