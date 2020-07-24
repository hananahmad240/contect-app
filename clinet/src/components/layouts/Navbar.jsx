import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);
	const { isAuthenticate, user, logout } = authContext;
	const { clearContact } = contactContext;

	const onLogout = () => {
		logout();
		clearContact();
	};

	const authLinks = (
		<Fragment>
			<li>{user && user.name.toUpperCase()}</li>
			<li>
				<a href="#!" onClick={onLogout}>
					<i className="fas fa-sign-out-alt"></i>
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);

	return (
		<Fragment>
			<div className="navbar bg-primary">
				<h1>
					<i className={icon}></i>
					{title}
				</h1>
				<ul>{isAuthenticate ? authLinks : guestLinks}</ul>
			</div>
		</Fragment>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};
Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt mr-2',
};
export default Navbar;
