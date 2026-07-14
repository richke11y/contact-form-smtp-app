import express from 'express';
import cors from 'cors';

import envConfig from './env-config.js';

import rateLimiter from './middlewear/rate-limit.js';
import honeypot from './middlewear/honeypot.js';
import validateSanitise from './middlewear/validate-sanitise.js';
import validateErrors from './middlewear/validate-errors.js';
import submitFormRoute from './routes/submit-form-route.js';

export default function createApp(transporter) {

	const { NODE_ENV, CORS_ORIGIN } = envConfig;

	const devENV = NODE_ENV === 'development' ? true : false;

	const app = express();

	// Development only: Serve static pages from ./public directory
	if (devENV) app.use(express.static('public'));

	if (!devENV) {

		// Tell Express to trust the first proxy in front of app.
		// Without this express-rate-limit cannot determine client's IP address.
		app.set('trust proxy', 1);

		// CORS
		app.use(cors({
			origin: CORS_ORIGIN,
			methods: ['POST'],
			allowedHeaders: ['Content-Type'],
			optionsSuccessStatus: 200
		}));

	}

	app.use(
		express.json(), // Parses POST request with a Content-Type of application/json
		express.urlencoded({ extended: true }), // Parses URL-encoded payload from the Contact Form.
		(req, res, next) => {

			console.log(req.method, req.path);

			next();

		}

	);

	// Listen for POST to /submit-form route
	app.post('/submit-form', rateLimiter, honeypot, validateSanitise, validateErrors, (req, res) => submitFormRoute(transporter, req, res));

	console.timeLog('Time', 'createApp()');

	return app;

}