//express-rate-limit.mintlify.app/overview
//github.com/express-rate-limit/express-rate-limit

import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv/config';

const rateLimiter = rateLimit({
	windowMs: parseInt(process.env.RATE_LIMIT_WINDOWMS, 10),
	limit: parseInt(process.env.RATE_LIMIT_LIMIT, 10),
	message: { error: 'Too many requests, please try again later.' },
	handler: (req, res, next, options) => {
		return res.status(options.statusCode).json({
			success: false,
			message: options.message.error
		})
	}
});

export default rateLimiter;