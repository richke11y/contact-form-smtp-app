//nodemailer.com/
//github.com/nodemailer/nodemailer

import dotenv from 'dotenv/config';

export default async function sendTheConfirmation(transporter, { name, email, message }) {

	console.log('sendTheConfirmation()');

	const messageObject = {
		from: process.env.EMAIL_FROM,
		replyTo: process.env.EMAIL_TO,
		to: email,
		subject: 'Contact Form Confirmation',
		html: `<p>Hi ${name}. Thank you for your message. We will try and get back to you as soon as possible.</p>
				<p>Here is a copy of your message:</p><br>
				<p>Name: ${name}.</p> <p>Email: <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" title="${email}">${email}</a>.</p> <p>Message: ${message}</p>`
	};

	try {

		const info = await transporter.sendMail(messageObject);

		console.log(info);

	} catch(error) {

		console.error(error);

	}

}