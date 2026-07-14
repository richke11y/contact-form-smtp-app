//express-validator.github.io/docs
//github.com/express-validator/express-validator

import { validationResult } from 'express-validator';

export default function validateErrors(req, res, next) {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {

		console.log(errors.array());

		const formattedErrors = {};

		errors.array().forEach(error => {

			if (!formattedErrors[error.path]) {

				formattedErrors[error.path] = [];

			}

			formattedErrors[error.path].push(error.msg);

		});

		return res.status(400).json({
			success: false,
			message: 'There are errors in the form. Please amend and try again.',
			errors: formattedErrors
		});

	}

	next();

}