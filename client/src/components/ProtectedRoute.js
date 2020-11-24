import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
	return (
		<Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login'  }}  /> } />
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps)(ProtectedRoute);
