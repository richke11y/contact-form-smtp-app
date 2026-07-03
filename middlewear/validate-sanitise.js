//express-validator.github.io/docs
//github.com/express-validator/express-validator

import { body } from 'express-validator';

const validateSanitise = [
	body('name')
		.notEmpty()
		.withMessage('Name is required.')
		.trim()
		.escape(),
	body('email')
		.notEmpty()
		.isEmail()
		.withMessage('Enter a valid email address.')
		.trim()
		.escape(),
	body('message')
		.notEmpty()
		.withMessage('Message is required.')
		.trim()
		.escape()
]

export default validateSanitise;