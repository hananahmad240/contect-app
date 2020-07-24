import {
	ADD_CONTACT,
	DELETE_CONTACT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_CURRENT,
	SET_ALERT,
	SET_CURRENT,
	REMOVE_ALERT,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACT,
	CLEAR_CONTACT,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload.data],
				loading: false,
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact._id !== action.payload
				),
				loading: false,
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact._id === action.payload._id ? action.payload : contact
				),
				loading: false,
			};
		case FILTER_CONTACT:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex) || contact.email.match(regex);
				}),
				loading: false,
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};
		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case GET_CONTACT:
			return {
				...state,
				contacts: action.payload.data,
				loading: false,
			};
		case CLEAR_CONTACT:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
			};
		default:
			return state;
	}
};
