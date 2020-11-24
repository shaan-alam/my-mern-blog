import {
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT, 
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "../actions/types";

// initial state
const initialState = {
	isLoading: false,
	isAuthenticated: null,
	token: localStorage.getItem("token"),
	user: null,
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				token: action.payload.token,
				user: action.payload.user,
			};

		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				isAuthenticated: false,
				token: null,
				user: null,
			};

		default:
			return state;
	}
};

export default auth;
