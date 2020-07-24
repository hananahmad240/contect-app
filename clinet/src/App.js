import React, { Fragment } from 'react';
import './App.css';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertsState from './context/alerts/AlertsState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Alerts from './components/layouts/Alerts';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import setAUthToken from './utils/setAUthToken';

import PrivateRoutes from './components/routing/PrivateRoutes';
if (localStorage.token) {
	setAUthToken(localStorage.token);
}

function App() {
	return (
		<AuthState>
			<ContactState>
				<AlertsState>
					<Router>
						<Fragment>
							<Navbar> </Navbar>
							<div className="container">
								<Alerts></Alerts>
								<Switch>
									<PrivateRoutes
										Route
										exact
										path="/"
										component={Home}
									></PrivateRoutes>
									<Route exact path="/about" component={About}></Route>
									<Route exact path="/register" component={Register}></Route>
									<Route exact path="/login" component={Login}></Route>
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertsState>
			</ContactState>
		</AuthState>
	);
}

export default App;
