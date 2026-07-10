//express-rate-limit.mintlify.app/overview
//github.com/express-rate-limit/express-rate-limit

import { rateLimit } from 'express-rate-limit';
import envConfig from '../env-config.js';

const { RATE_LIMIT_LIMIT, RATE_LIMIT_WINDOWMS } = envConfig;

const rateLimiter = rateLimit({
	windowMs: parseInt(RATE_LIMIT_WINDOWMS, 10),
	limit: parseInt(RATE_LIMIT_LIMIT, 10),
	message: { 
		error: 'Too many attempts, please try again later.' 
	},
	handler: (req, res, next, options) => {
		return res.status(options.statusCode).json({
			success: false,
			message: options.message.error
		})
	}
});

export default rateLimiter;