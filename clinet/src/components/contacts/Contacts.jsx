import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layouts/Spinner';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered, getContact, loading } = contactContext;
	// console.log(contacts);0

	useEffect(() => {
		getContact();
	}, []);

	if (contacts !== null && contacts.length === 0) {
		return <h4>Please Add A contact</h4>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((contact) => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames="item"
								>
									<ContactItem contact={contact}></ContactItem>
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames="item"
								>
									<ContactItem contact={contact}></ContactItem>
								</CSSTransition>
						  ))}

					{/* {contacts.map((contact) => (
				<ContactItem key={contact.id} contact={contact}></ContactItem>
			))} */}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
