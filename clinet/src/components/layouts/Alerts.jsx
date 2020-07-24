import React, { useContext } from 'react';
import AlertsContext from '../../context/alerts/alertsContext';

const Alerts = () => {
	const alertsContext = useContext(AlertsContext);
	const { alerts } = alertsContext;
	return (
		alerts.length > 0 &&
		alerts.map((alert) => (
			<div className={`alert alert-${alert.type}`} key={alert.id}>
				<i className="fas fa-info-circle"></i>
				{alert.msg}
			</div>
		))
	);
};

export default Alerts;
