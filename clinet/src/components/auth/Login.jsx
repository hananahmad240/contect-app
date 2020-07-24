import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ALertsContext from '../../context/alerts/alertsContext';

const Login = (props) => {
	const authContext = useContext(AuthContext);
	const alertsContext = useContext(ALertsContext);

	const { login, error, clearError, isAuthenticate } = authContext;
	const { setAlert, alerts } = alertsContext;

	useEffect(() => {
		if (isAuthenticate) {
			// redirect
			props.history.push('/');
			// Router.push('/');
		}

		if (error === 'Invalid Credebials') {
			setAlert('Invalid Credebials', 'danger');
			clearError();
		}
		// place important
	}, [error, isAuthenticate, props.history]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const { email, password } = user;

	const onChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlert('Please Enter All the Fields', 'danger');
		} else {
			const userLogin = { email, password };
			login(userLogin);
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account
				<span className="text-primary"> Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" onChange={onChange} />
				</div>

				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" onChange={onChange} />
				</div>

				<div>
					<input
						type="submit"
						value="Submit"
						className="btn btn-block btn-success"
					/>
				</div>
			</form>
		</div>
	);
};

export default Login;
