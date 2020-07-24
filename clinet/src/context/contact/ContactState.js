import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
// import {
// 	v4 as uuid
// } from 'uuid';
import axios from 'axios';
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

const ContactState = (props) => {
	const initialState = {
		// all contact
		// contacts: [{
		// 		id: 1,
		// 		name: 'Developer1',
		// 		email: 'developer1@gmail.com',
		// 		phone: '0322-4838012',
		// 		type: 'personal',
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'Developer2',
		// 		email: 'developer2@gmail.com',
		// 		phone: '0322-4838012',
		// 		type: 'personal',
		// 	},
		// 	{
		// 		id: 3,
		// 		name: 'Developer3',
		// 		email: 'developer3@gmail.com',
		// 		phone: '0322-4838012',
		// 		type: 'professional',
		// 	},
		// ],
		contacts: null,
		current: null,
		filtered: null,
		error: null,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);
	// 1 Add Contact
	const addContact = async (contact) => {
		// contact.id = uuid();
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);
			console.log(res.data);
			dispatch({
				type: ADD_CONTACT,
				payload: res.data,
			});
		} catch (err) {
			console.log(err.response.data.msg);
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	// get Contacts

	const getContact = async () => {
		try {
			const res = await axios.get('/api/contacts');
			console.log(res.data);
			dispatch({
				type: GET_CONTACT,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.data.msg,
			});
		}
	};

	// 2 Filter Contact
	const filterContact = (text) => {
		dispatch({
			type: FILTER_CONTACT,
			payload: text,
		});
	};

	// 3 clear current contact
	const clearCurrent = () => {
		dispatch({
			type: CLEAR_CURRENT,
		});
	};

	// 4 set current contact
	const setCurrent = (contact) => {
		dispatch({
			type: SET_CURRENT,
			payload: contact,
		});
	};

	// 5 update contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			console.log('updateed');
			dispatch({
				type: UPDATE_CONTACT,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.data.msg,
			});
		}
	};

	// 6 delete contact

	const deleteContact = async (id) => {
		try {
			const res = await axios.delete(`/api/contacts/${id}`);
			console.log(res);

			dispatch({
				type: DELETE_CONTACT,
				payload: id,
			});
		} catch (error) {
			console.log('hanan');

			// dispatch({
			// 	type: CONTACT_ERROR,
			// 	payload: error.response.data.msg,
			// });
		}
	};

	// 7  clear Filter

	const clearFilter = () => {
		return dispatch({
			type: CLEAR_FILTER,
		});
	};

	const clearContact = () => {
		dispatch({
			type: CLEAR_CONTACT,
		});
	};

	// return
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				error: state.error,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				clearFilter,
				filterContact,
				getContact,
				clearContact,
			}}
		>
			{' '}
			{props.children}{' '}
		</ContactContext.Provider>
	);
};

export default ContactState;
