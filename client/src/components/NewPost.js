import React, { useState } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { createPost } from "../Redux/actions/creators";
import { withRouter, Link } from "react-router-dom";
import AlertBox from "./AlertBox";
import { getMessages, clearMessages } from "../Redux/actions/creators";

const NewPost = (props) => {
	// state values
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const handleFormSubmission = () => {
		// clear messages if any
		props.clearMessages();

		if (!title || !body) {
			// validation

			return props.getMessages({
				color: "danger",
				text: "Please do not leave any field(s) blank!",
			});
		}

		// create a new post object
		const newPost = {
			title,
			body,
		};

		// create post
		props.createPost(newPost);

		// redirect to home page
		props.history.push("/posts");
	};

	return (
		<Container className="mt-3">
			<h1 className="text-dark my-2">New Post</h1>
			{props.message.text && (
				<AlertBox color={props.message.color} text={props.message.text} />
			)}
			<Form>
				<FormGroup>
					<Label for="title">Title: </Label>
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						type="text"
						name="title"
						id="title"
						placeholder="Title"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="body">Body: </Label>
					<Input
						value={body}
						onChange={(e) => setBody(e.target.value)}
						type="textarea"
						id="body"
						placeholder="Body"
					/>
				</FormGroup>
				<Link to="/posts">
					<Button color="danger">Cancel</Button>
				</Link>
				<Button color="success" className="ml-2" onClick={handleFormSubmission}>
					Save
				</Button>
			</Form>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		message: state.messages.message,
		token: state.auth.token,
	};
};

export default withRouter(connect(mapStateToProps, {
	createPost,
	getMessages,
	clearMessages,
})(NewPost));
