import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	const authContext = useContext(AuthContext);
	const { addContact, current, updateContact, clearCurrent } = contactContext;
	const { loadUser } = authContext;

	useEffect(() => {
		loadUser();
	}, []);
	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	useEffect(() => {
		// console.log(current);
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
		}
	}, [contactContext, current]);

	const { name, email, phone, type } = contact;
	const onChange = (e) => {
		setContact({
			...contact,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}
		clearAll();
	};

	const clearAll = () => {
		// setContact({
		// 	name: '',
		// 	email: '',
		// 	phone: '',
		// 	type: 'personal',
		// });
		clearCurrent();
	};
	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
			<input
				type="text"
				name="name"
				value={name}
				placeholder="Enter the name"
				onChange={onChange}
			/>
			<input
				type="email"
				name="email"
				value={email}
				placeholder="Enter the email"
				onChange={onChange}
			/>
			<input
				type="text"
				name="phone"
				value={phone}
				placeholder="Enter the phone"
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type="radio"
				name="type"
				value="personal"
				checked={type === 'personal'}
				onChange={onChange}
			/>
			Personal{' '}
			<input
				type="radio"
				name="type"
				value="professional"
				checked={type === 'professional'}
				onChange={onChange}
			/>
			Professional
			<input
				type="submit"
				value={current ? 'Update Contact' : 'Submit'}
				className="btn btn-primary btn-block"
			/>
			{current && (
				<div>
					<input
						type="button"
						value="Clear"
						className="btn btn-dark btn-block"
						onClick={clearAll}
					/>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
