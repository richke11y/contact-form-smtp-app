//github.com/expressjs/cors
//expressjs.com/en/resources/middleware/cors/

import cors from 'cors';
import dotenv from 'dotenv/config';

export default function corsHeaders(req, res, next) {

	console.log('corsHeaders()');

	cors({
		origin: process.env.CORS_ORIGIN,
		methods: 'POST',
		allowedHeaders: 'Content-Type,application/json',
		optionsSuccessStatus: 200
	});

	next();

}