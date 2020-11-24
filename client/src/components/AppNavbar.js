import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import { logout } from "../Redux/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const AppNavbar = ({ history, isAuthenticated, logout }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const GuestLinks = () => (
		<>
			<NavItem>
				<Link to="/register">Register</Link>
			</NavItem>
			<NavItem>
				<Link to="/login">Login</Link>
			</NavItem>
		</>
	);

	const AuthLinks = () => (
		<>
			<NavItem>
				<Link to="/posts">Home</Link>
			</NavItem>
			<NavItem>
				<Link to="/new-post">New Post</Link>
			</NavItem>
			<NavItem onClick={() => logout(() => history.push("/"))}>
				<Link>Logout</Link>
			</NavItem>
		</>
	);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<Container>
					<NavbarBrand href="/">My Blog</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{isAuthenticated ? <AuthLinks /> : <GuestLinks />}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token,
	};
};

export default withRouter(connect(mapStateToProps, { logout })(AppNavbar));
