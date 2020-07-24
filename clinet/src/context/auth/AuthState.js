import React, {
	useReducer
} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import setAUthToken from '../../utils/setAUthToken';

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	USER_LOADED,
	AUTH_ERROR,
} from '../types';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticate: null,
		user: null,
		loading: true,
		error: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);
	// loged user
	const loadUser = async () => {
		if (localStorage.token) {
			setAUthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
				payload: err.response.data.msg,
			});
		}
	};
	// login user
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/auth', formData, config);
			// console.log(res.data);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			loadUser();
		} catch (err) {
			// console.log(err.response.data.msg);
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};
	// register user
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', formData, config);
			// console.log(res.data);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			loadUser();
		} catch (err) {
			// console.log(err.response.data);

			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
		}
	};
	// logout
	const logout = () => {
		dispatch({
			type: LOGOUT,
		});
	};
	// clear errors
	const clearError = () => {
		dispatch({
			type: CLEAR_ERRORS,
		});
	};

	// return
	return ( <
		AuthContext.Provider value = {
			{
				token: state.token,
				isAuthenticate: state.isAuthenticate,
				user: state.user,
				loading: state.loading,
				error: state.error,
				register,
				clearError,
				loadUser,
				login,
				logout,
			}
		} > {
			props.children
		} <
		/AuthContext.Provider>
	);
};

export default AuthState;