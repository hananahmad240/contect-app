import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ALertsContext from '../../context/alerts/alertsContext';

const Register = (props) => {
	const authContext = useContext(AuthContext);
	const alertsContext = useContext(ALertsContext);
	const { register, error, clearError, isAuthenticate } = authContext;
	const { setAlert, alerts } = alertsContext;
	useEffect(() => {
		if (isAuthenticate) {
			// redirect
			props.history.push('/');
			// Router.push('/');
		}

		if (error === 'user is already exits with this email') {
			setAlert('user is already exits with this email', 'danger');
			clearError();
		}
		// place important
	}, [error, isAuthenticate, props.history]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const onChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (name === '' || email === '' || password === '' || password2 === '') {
			setAlert('Please Complete All fileds', 'danger');
		} else if (password2 !== password) {
			setAlert('Password does not matched', 'danger');
		} else {
			const newUser = { name, email, password };
			register(newUser);
		}
	};

	const { name, email, password, password2 } = user;
	return (
		<div className="form-container">
			<h1>
				Account
				<span className="text-primary"> Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" onChange={onChange} />
				</div>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" onChange={onChange} />
				</div>

				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						onChange={onChange}
						minLength="6"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
					<input
						type="password"
						name="password2"
						onChange={onChange}
						minLength="6"
					/>
				</div>
				<div>
					<input
						type="submit"
						value="Submit"
						className="btn btn-block btn-danger"
					/>
				</div>
			</form>
		</div>
	);
};

export default Register;
