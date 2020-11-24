const Joi = require("@hapi/joi");

function registrationValidation(req, res, next) {
	const schema = Joi.object({
		username: Joi.string().required(),
		fullName: Joi.string().required(),
		password: Joi.string().min(8).required(),
	});

	res.validation = schema.validate(req.body);
	next();
}

function loginValidation(req, res, next) {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().min(8).required(),
	});

	res.validation = schema.validate(req.body);
	next();
}

module.exports = { registrationValidation, loginValidation };
