const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	// token verification
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(400).json({ message: "Access Denied" });
	}

	try {
		const verifiedId = jwt.verify(token, process.env.SECRET);
		req.user = verifiedId;
		next();
	} catch (err) {
		res.json({ message: "Invalid token" });
	}
}

module.exports = auth;
