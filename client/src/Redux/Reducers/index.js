import { combineReducers } from "redux";
import posts from "./postReducer";
import messages from "./messagesReducer";
import auth from "./authReducers";

export default combineReducers({ posts, messages, auth });
