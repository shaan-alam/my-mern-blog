import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardText, CardBody, CardTitle } from "reactstrap";
import TextTruncate from "react-text-truncate";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export default function Post({ post }) {
	const [time, setTime] = useState("");

	useEffect(() => {
		TimeAgo.addLocale(en);

		// Create formatter (English).
		const timeAgo = new TimeAgo("en-US");

		setTime(timeAgo.format(new Date(post.Date)));
	}, []);

	// Truncated text
	const TruncatedPostody = () => (
		<TextTruncate
			line={1}
			element="span"
			truncateText="…"
			text={post.body}
			textTruncateChild={<Link to="/post">Read on</Link>}
		/>
	);

	return (
		<Col className="my-3">
			<Card inverse color="light">
				<CardBody>
					<CardTitle tag="h5" className="text-dark">{post.title}</CardTitle>
					<CardText className="text-muted">
						{post.body.length < 20 ? post.body : <TruncatedPostody />}
					</CardText>
					<Link to={`/edit-post/${post._id}`} className="card-link">
						Edit
					</Link>
					<h6 className="mt-2 text-muted">Me {time}</h6>
				</CardBody>
			</Card>
		</Col>
	);
}
