const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		max: 1024,
		required: true,
	},
	password: {
		type: String,
		min: 8,
		required: true,
	},
	Date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", UserSchema);
