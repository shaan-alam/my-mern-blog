import {
	CREATE_POST,
	DELETE_POST,
	EDIT_POST,
	GET_POSTS,
} from "../actions/types";

// Initial state
const initialState = {
	posts: [],
};

function posts(state = initialState, action) {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: [...action.payload],
			};

		case CREATE_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};

		case EDIT_POST:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post._id === action.payload._id) {
						return action.payload;
					}

					return post;
				}),
			};

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};

		default:
			return state;
	}
}

export default posts;
