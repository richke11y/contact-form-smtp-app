import express from 'express';
import dotenv from 'dotenv/config';

import corsHeaders from './middlewear/cors.js';
import rateLimiter from './middlewear/rate-limit.js';
import honeypot from './middlewear/honeypot.js';
import validateSanitise from './middlewear/validate-sanitise.js';
import validateErrors from './middlewear/validate-errors.js';
import submitFormRoute from './routes/submit-form-route.js';

export default function createApp(transporter) {

	const app = express();

	const devENV = process.env.NODE_ENV === 'development' ? true : false;

	// Development only: Serve static pages from ./public directory
	if (devENV) app.use(express.static('public'));
	
	// POST to /submit-form route
	app.post('/submit-form', 
		corsHeaders, // Check CORS headers
		rateLimiter, // Rate limit
		express.json(), // Parses POST request with a Content-Type of application/json
		express.urlencoded({ extended: true }), // Parses URL-encoded payload from the Contact Form.
		honeypot, // Check if honeypot field has been filled.
		validateSanitise, // Validate and sanitise posted data
		validateErrors, // Validation errors
		(req, res) => submitFormRoute(transporter, req, res)
	);

	return app;

}