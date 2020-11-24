const express = require("express");
const router = express.Router();
const {
	registrationValidation,
	loginValidation,
} = require("../middlewares/credentialValidation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @TYPE    POST
 * @DESC    Register a user
 * @ACCESS  Public
 */

router.post("/register/", registrationValidation, async (req, res) => {
	const { username, fullName, password } = req.body;

	// check for errors
	const { error } = res.validation;
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	// check if user already exists
	const userExists = await User.findOne({ username });
	if (userExists) {
		return res.status(400).json({ message: "That username is already taken!" });
	}

	// generate salt and hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	// if everything is OK

	try {
		const newUser = await new User({
			username,
			fullName,
			password: hashedPassword,
		});
		await newUser.save();

		// create and sign a token
		const token = jwt.sign({ _id: newUser._id }, process.env.SECRET);
		res.json({ token, user: { username, fullName } });
	} catch (err) {
		res.json({ message: err });
	}
});

/**
 * @TYPE    POST
 * @DESC    Login User
 * @ACCESS  Public
 */

router.post("/login/", loginValidation, async (req, res) => {
	const { username, password } = req.body;

	// check for errors
	const { error } = res.validation;
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	// check if user already doesn't exists
	const user = await User.findOne({ username });
	if (!user) {
		return res.status(400).json({ message: "User doesn't exists" });
	}

	// compare password
	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		return res.status(400).json({ message: "Invalid password" });
	}

	// if everything is OK
	try {
		// sign a token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);
		res.json({ token, user: { username, fullName: user.fullName } });
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
