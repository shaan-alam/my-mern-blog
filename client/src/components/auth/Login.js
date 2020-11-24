import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getMessages } from "../../Redux/actions/creators";
import { connect } from "react-redux";
import AlertBox from "../AlertBox";
import { withRouter } from "react-router-dom";
import { login } from "../../Redux/actions/authActions";

const Login = ({ history, login, message, getMessages }) => {
	// state values
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleFormSubmission = () => {
		// validation process
		if (!username || !password) {
			return getMessages({
				color: "danger",
				text: "Please do not leave any field(s) blank!",
			});
		}

		// login
		login({ username, password }, () => history.push("/posts"));
	};

	return (
		<div className="register-form">
			<div className="form">
				{message.text && <AlertBox color={message.color} text={message.text} />}

				<h1 className="text-primary text-center my-2">Login</h1>
				<Form>
					<FormGroup>
						<Label for="username">Username: </Label>
						<Input
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							name="email"
							id="username"
							placeholder="username"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							name="password"
							id="password"
							placeholder="Password"
						/>
					</FormGroup>
					<Button color="primary" block onClick={handleFormSubmission}>
						Login
					</Button>
					<small className="mt-2">
						New member ??
						<span className="text-primary"> Create an account</span> here.
					</small>
				</Form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		message: state.messages.message,
	};
};

export default withRouter(
	connect(mapStateToProps, { login, getMessages })(Login)
);
