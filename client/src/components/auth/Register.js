import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from 'react-redux';
import { register } from '../../Redux/actions/authActions';

const Register = ({ history, register }) => {
	// state values
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [password, setPassword] = useState("");

  // function to handle the form submission
  const handleFormSubmission = (e) => {

    // prevent defualt action
    e.preventDefault();

    // create a new user
    const newUser = {
      username,
      fullName, 
      password
    }

    // register the user and redirect to the posts page
    register(newUser, () => history.push('/posts'));
  }

	return (
		<div className="register-form">
			<div className="form">
				<h1 className="text-primary text-center my-2">Register</h1>
				<Form>
					<FormGroup>
						<Label for="username">Username: </Label>
						<Input
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							name="email"
							id="username"
							placeholder="Username"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="fullname">Full Name: </Label>
						<Input
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							type="text"
							name="email"
							id="fullname"
							placeholder="Full Name"
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
						Register
					</Button>
					<small className="mt-2">
						Already a registered user?{" "}
						<span className="text-primary">Login</span> here.
					</small>
				</Form>
			</div>
		</div>
	);
};

export default connect(null, { register })(Register);
