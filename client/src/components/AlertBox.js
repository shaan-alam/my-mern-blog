import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { clearMessages } from "../Redux/actions/creators";

function AlertBox({ color, text, clearMessages }) {
	const [alert, setAlert] = useState(true);

	// clear messages
	const clearAlert = () => {
		// remove the alert
		setAlert(false);

		// clear message object
		clearMessages();
	};

	return (
		<Alert color={color} isOpen={alert} toggle={clearAlert}>
			{text}
		</Alert>
	);
}

export default connect(null, { clearMessages })(AlertBox);
