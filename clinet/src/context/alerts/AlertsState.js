import React, { useReducer } from 'react';
import AlertsContext from './alertsContext';
import AlertsReducer from './alertsReducer';
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertsState = (props) => {
	const initialize = [];

	const [state, dispatch] = useReducer(AlertsReducer, initialize);

	// set alert

	const setAlert = (msg, type, timeout = 5000) => {
		const id = uuid();
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		});

		setTimeout(() => {
			dispatch({
				type: REMOVE_ALERT,
				payload: id,
			});
		}, timeout);
	};

	return (
		<AlertsContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertsContext.Provider>
	);
};

export default AlertsState;
