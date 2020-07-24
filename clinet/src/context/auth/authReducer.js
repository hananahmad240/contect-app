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

export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				user: action.payload.data,
					isAuthenticate: true,
					loading: false
			}
			case REGISTER_SUCCESS:
				localStorage.setItem('token', action.payload.token);
				return {
					...state,
					...action.payload,
						isAuthenticate: true,
						loading: false
				}
				case REGISTER_FAIL:
				case AUTH_ERROR:
				case LOGIN_FAIL:

					localStorage.removeItem('token');
					return {
						...state,
						token: null,
							isAuthenticate: false,
							loading: false,
							error: action.payload
					}
					case CLEAR_ERRORS:
						return {
							error: null
						}
						case LOGIN_SUCCESS:
							localStorage.setItem('token', action.payload.token);
							return {
								...state,
								...action.payload,
									isAuthenticate: true,
									loading: false
							}
							case LOGOUT:
								localStorage.removeItem('token');
								return {
									...state,
									token: null,
										isAuthenticate: false,
										loading: false,
								}

								default:
									return state
	}
};