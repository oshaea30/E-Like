import API from '../../API';
import { signInAction, signUpAction } from './actions';

const api = new API();
const LOGIN_USER_KEY = 'LOGIN_USER_KEY';

export const fetchUserFromLocalStorage = () => {
	return async (dispatch) => {
		const userJSON = localStorage.getItem(LOGIN_USER_KEY);
		if (userJSON && userJSON.token !== '') {
			dispatch(signInAction(JSON.parse(userJSON)));
		}
	};
};

export const signUp = (signUpBody) => {
	return async (dispatch) => {
		return api
			.signUp(signUpBody)
			.then((user) => {
				dispatch(signUpAction(user));
				localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
			})
			.catch((error) => {
				alert('Failed to connect API to sign up');
				console.log(error);
			});
	};
};

export const signIn = (signInBody) => {
	return async (dispatch) => {
		return api
			.signIn(signInBody)
			.then((user) => {
				dispatch(signInAction(user));
				localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
			})
			.catch((error) => {
				alert(
					'Please make sure you fill the correct email and password.',
				);
				console.log(error);
			});
	};
};
