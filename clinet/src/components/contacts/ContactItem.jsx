import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, clearCurrent, setCurrent } = contactContext;

	const { _id, name, email, phone, type } = contact;

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	const onEdit = () => {
		setCurrent(contact);
	};
	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{name} {'  '}
				<span
					className={
						type === 'professional'
							? 'badge badge-success'
							: 'badge badge-primary'
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>

			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-envelope-open"></i> {email}
					</li>
				)}

				{phone && (
					<li>
						<i className="fas fa-phone"></i> {phone}
					</li>
				)}
			</ul>
			<p>
				<button className="btn btn-dark btn-sm" onClick={onEdit}>
					Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};
ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default ContactItem;
