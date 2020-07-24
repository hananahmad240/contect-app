import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticate, loading } = authContext;
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticate && !loading ? (
					<Redirect to="/login"></Redirect>
				) : (
					<Component {...props}></Component>
				)
			}
		></Route>
	);
};

export default PrivateRoutes;
