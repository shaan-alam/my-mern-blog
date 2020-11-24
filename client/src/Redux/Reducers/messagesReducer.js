import { GET_MESSAGES, CLEAR_MESSAGES } from "../actions/types";

const initialState = {
	message: {
		id: "",
		text: "",
	},
};

function messages(state = initialState, action) {
	switch (action.type) {
		case GET_MESSAGES:
			return {
				...state,
				message: action.payload,
			};

		case CLEAR_MESSAGES:
			return {
				...state,
				message: {
					...state.message,
					color: "",
					text: "",
				},
			};

		default:
			return state;
	}
}

export default messages;
