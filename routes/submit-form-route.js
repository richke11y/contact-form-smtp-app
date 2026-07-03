import { matchedData } from 'express-validator';

import sendTheMail from '../nodemailer/send-the-mail.js';
import sendTheConfirmation from '../nodemailer/send-the-confirmation.js';

export default async function submitFormRoute(transporter, req, res, next) {

	console.log('submitFormRoute()');

	try {

		// console.log('REQ.RAWHEADERS:');
		// console.log(req.rawHeaders);

		// console.log('REQ.RATELIMIT:')
		// console.log(req.rateLimit);

		console.log('REQ.BODY:');
		console.log(req.body);

		console.log('REQ.IP:');
		console.log(req.ip);

		const { name, email, message } = matchedData(req);

		const result = await sendTheMail(transporter, { name, email, message });

		if (!result.success) {

			return res.status(500).json(result);

		}

		// Send confirmation email.
		// Is this positioned correctly in the order?
		// Fails silently - how to handle this so more useful on frontend?
		// try {
		// 	await sendTheConfirmation(transporter, { name, email, message });
		// } catch(error) {
		// 	console.error(error);
		// }

		// console.log('RES:');
		// console.log(res);

		return res.status(200).json(result);

	} catch(error) {

		console.error(error);

		// Every request must end with a response!
		res.status(500).json({
			success: false,
			message: 'Internal server error',
			errors: error
		});

	}

	next();

}