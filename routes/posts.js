const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middlewares/auth");

/**
 * @TYPE    GET
 * @DESC    Get all the posts
 * @ACCESS  Private
 */

router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find({}).sort({ Date: -1 });
		res.json(posts);
	} catch (err) {
		res.json({ message: "No posts found!" });
	}
});

/**
 * @TYPE    GET
 * @DESC    Get a single post
 * @ACCESS  Private
 */

router.get("/:_id", auth, async (req, res) => {
	const { _id } = req.params;

	try {
		const post = await Post.findOne({ _id });
		res.json(post);
	} catch (err) {
		res.json({ message: "No post found!" });
	}
});

/**
 * @TYPE    POST
 * @DESC    Create a new Post
 * @ACCESS  Private
 */

router.post("/", auth, async (req, res) => {
	// extract post details from req.body
	const { title, body } = req.body;

	try {
		const newPost = await new Post({ title, body });
		await newPost.save();

		res.json(newPost);
	} catch (err) {
		res.json({ message: err });
	}
});

/**
 * @TYPE    DELETE
 * @DESC    Delete a Post
 * @ACCESS  Private
 */

router.delete("/:id", auth, async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id });
		res.json({ message: "Post Deleted!" });
	} catch (err) {
		res.json({ message: err });
	}
});

/**
 * @TYPE    PUT
 * @DESC    EDIT a Post
 * @ACCESS  Private
 */

router.put("/", auth, async (req, res) => {
	// extract post details
	const { post } = req.body;

	try {
		await Post.updateOne({ _id: post._id }, post);
		const updatedPost = await Post.findOne({ _id: post._id });
		res.json(updatedPost);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
