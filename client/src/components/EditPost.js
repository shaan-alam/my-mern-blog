import React, { useEffect, useState } from "react";
import {
	Container,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
} from "reactstrap";
import AlertBox from "./AlertBox";
import { editPost } from "../Redux/actions/creators";
import { connect } from "react-redux";
import { deletePost } from "../Redux/actions/creators";
import { getMessages, clearMessages } from "../Redux/actions/creators";
import axios from "axios";

const EditPost = (props) => {
	// state values
	const [_id, setID] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	useEffect(() => {
		// token configuraion
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (props.token !== null) {
			config.headers["x-auth-token"] = props.token;
		}

		const fetchPost = () => {
			try {
				axios
					.get(`/api/posts/${props.match.params._id}`, config)
					.then((res) => {
						setID(res.data._id);
						setTitle(res.data.title);
						setBody(res.data.body);
					});
			} catch (err) {
				console.log(err);
			}
		};

		fetchPost();
	}, []);

	const handleFormSubmission = (e) => {
		// get id for original post from redux state

		// clear messages if any
		props.clearMessages();

		if (!title || !body) {
			// validation

			return props.getMessages({
				color: "danger",
				text: "Please do not leave any field(s) blank!",
			});
		}

		if (e.target.name === "save") {
			// create a new post object
			const post = {
				_id,
				title,
				body,
			};

			// edit post
			props.editPost(post);
		} else if (e.target.name === "delete") {
			// delete post
			props.deletePost(_id);
		}

		// redirect to homepage
		props.history.push("/posts");
	};

	return (
		<Container className="mt-3">
			<h1 className="text-dark my-2">Edit Post</h1>
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
				<Row>
					<Col>
						<Button
							color="danger"
							className="ml-2"
							name="delete"
							onClick={handleFormSubmission}
						>
							Delete
						</Button>
					</Col>
					<Col className="clearfix">
						<Button
							color="success"
							className="ml-3 float-right"
							name="save"
							onClick={handleFormSubmission}
						>
							Save
						</Button>
						<Button
							color="danger"
							className="float-right"
							name="cancel"
							onClick={handleFormSubmission}
						>
							Cancel
						</Button>
					</Col>
				</Row>
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

export default connect(mapStateToProps, {
	editPost,
	deletePost,
	getMessages,
	clearMessages,
})(EditPost);
