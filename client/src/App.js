import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// components here
import AppNavbar from "./components/AppNavbar";
import Posts from "./components/Posts";
import NewPost from "./components/NewPost";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import EditPost from "./components/EditPost";
import ProtectedRoute from "./components/ProtectedRoute";
import NoRoute from "./components/NoRoute";

function App() { 
	return (
		<>
			<AppNavbar />
			<Switch>
				<Route path="/" component={Login} exact />
				<ProtectedRoute path="/posts" component={Posts} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<ProtectedRoute path="/new-post" component={NewPost} />
				<ProtectedRoute path="/edit-post/:_id" component={EditPost} />
				<Route path="*" component={NoRoute} />
			</Switch>
		</>
	);
}

export default App;
