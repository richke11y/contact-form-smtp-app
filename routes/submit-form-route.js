import { matchedData } from 'express-validator';

import sendTheMail from '../nodemailer/send-the-mail.js';
import sendTheConfirmationMail from '../nodemailer/send-the-confirmation.js';

export default async function submitFormRoute(transporter, req, res, next) {

	try {

		console.timeLog('Submit Time', 'Request Body');
		console.log(req.body);

		const { name, email, message } = matchedData(req);

		const result = await sendTheMail(transporter, { name, email, message });

		if (!result.success) {

			return res.status(500).json(result);

		}

		await sendTheConfirmationMail(transporter, { name, email, message });

		console.timeLog('Submit Time', 'Response', result);
		console.timeEnd('Submit Time');

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