import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Landing from './containers/Landing';
import SignIn from './containers/SignIn';
import SignUp from './containers/Signup';
import { fetchUserFromLocalStorage } from './reducks/users/operations';
import { getUser } from './reducks/users/selectors';

const Router = () => {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const user = getUser(selector);
	const token = user ? user.token : null;
	useEffect(() => {
		dispatch(fetchUserFromLocalStorage());
		// eslint-disable-next-line
	}, []);

	return (
		<React.Fragment>
			<Switch>
				<Route exact path={'/'} component={token ? Home : Landing} />
				<Route
					exact
					path={'/sign-up'}
					component={token ? Home : SignUp}
				/>
				<Route
					exact
					path={'/sign-in'}
					component={token ? Home : SignIn}
				/>
			</Switch>
		</React.Fragment>
	);
};
export default Router;
