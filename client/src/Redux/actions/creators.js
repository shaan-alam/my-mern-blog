import {
	GET_POSTS,
	CREATE_POST,
	EDIT_POST,
	DELETE_POST,
	GET_MESSAGES,
	CLEAR_MESSAGES,
} from "./types";
import axios from "axios";

function tokenConfig(getState) {
	// set headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// extract token and assign it in the header
	const token = getState().auth.token;
	if (token !== null) {
		config.headers["x-auth-token"] = token;
	}

	return config;
}

// get all the posts
export const getPosts = () => (dispatch, getState) => {
	axios.get("/api/posts/", tokenConfig(getState)).then((res) => {
		dispatch({ type: GET_POSTS, payload: res.data });
	});
};

// create a new post
export const createPost = (post) => (dispatch, getState) => {
	axios.post("/api/posts/", post, tokenConfig(getState)).then((res) => {
		dispatch({ type: CREATE_POST, payload: res.data });
		dispatch(
			getMessages({ color: "success", text: "Your post has been created!!" })
		);
	});
};

// edit a post
export const editPost = (post) => (dispatch, getState) => {
	axios.put(`/api/posts/`, { post }, tokenConfig(getState)).then((res) => {
		dispatch({ type: EDIT_POST, payload: res.data });
		dispatch(
			getMessages({ color: "success", text: "Your post has been updated!!" })
		);
	});
};

// delete a post
export const deletePost = (_id) => (dispatch, getState) => {
	axios.delete(`/api/posts/${_id}`, tokenConfig(getState)).then((res) => {
		dispatch({ type: DELETE_POST, payload: _id });
		dispatch(
			getMessages({ color: "success", text: "Your post has been deleted!!" })
		);
	});
};

// get messages
export const getMessages = ({ color, text }) => {
	return {
		type: GET_MESSAGES,
		payload: {
			color: color,
			text: text,
		},
	};
};

// clear messages
export const clearMessages = () => {
	return {
		type: CLEAR_MESSAGES,
	};
};
