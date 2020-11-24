const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		max: 1024,
		required: true,
	},
	Date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("posts", PostSchema);
