import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';

import rateLimiter from './middlewear/rate-limit.js';
import honeypot from './middlewear/honeypot.js';
import validateSanitise from './middlewear/validate-sanitise.js';
import validateErrors from './middlewear/validate-errors.js';
import submitFormRoute from './routes/submit-form-route.js';

export default function createApp(transporter) {

	const devENV = process.env.NODE_ENV === 'development' ? true : false;

	const app = express();

	// Development only: Serve static pages from ./public directory
	if (devENV) app.use(express.static('public'));

	if (!devENV) {

		// Tell Express to trust the first proxy in front of app.
		// Without this express-rate-limit cannot determine client's IP address.
		app.set('trust proxy', 1);

		// CORS
		app.use(cors({
			origin: process.env.CORS_ORIGIN,
			methods: ['POST'],
			allowedHeaders: ['Content-Type'],
			optionsSuccessStatus: 200
		}));

	}

	app.use((req, res, next) => {
		console.log(req.method, req.path);
		next();
	});

	// POST to /submit-form route
	app.post('/submit-form', 
		rateLimiter,
		express.json(), // Parses POST request with a Content-Type of application/json
		express.urlencoded({ extended: true }), // Parses URL-encoded payload from the Contact Form.
		honeypot,
		validateSanitise,
		validateErrors,
		(req, res) => submitFormRoute(transporter, req, res)
	);

	return app;

}