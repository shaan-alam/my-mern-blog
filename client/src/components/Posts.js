import React, { useEffect } from "react";
import { Container, Alert, Row } from "reactstrap";
import Post from "./Post";
import { connect } from "react-redux";
import { clearMessages } from "../Redux/actions/creators";
import AlertBox from "./AlertBox";
import { getPosts } from "../Redux/actions/creators";

const PostsComponent = (posts) => {
	// posts component
	const Posts = () => {
		return posts.length === 0 ? (
			<Alert color="danger">No Posts to show!</Alert>
		) : (
			<Row lg="4" md="3" sm="2" xs="1">
				{posts.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</Row>
		);
	};

	return <Posts />;
};

function Posts({ getPosts, message, posts }) {
	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="posts">
			<Container>
				{message.text && <AlertBox color={message.color} text={message.text} />}
				{PostsComponent(posts)}
			</Container>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		posts: state.posts.posts,
		message: state.messages.message,
	};
};

export default connect(mapStateToProps, { getPosts, clearMessages })(Posts);
