//nodemailer.com/
//github.com/nodemailer/nodemailer
import envConfig from '../env-config.js';

export default async function sendTheConfirmationMail(transporter, { name, email, message }) {

	console.log('sendTheConfirmationMail()');

	const { EMAIL_FROM, EMAIL_TO } = envConfig;

	const messageObject = {
		from: EMAIL_FROM,
		replyTo: EMAIL_TO,
		to: email,
		subject: 'Contact Form Confirmation',
		html: `<p>Hi ${name}. Thank you for your message. We will try and get back to you as soon as possible.</p>
				<p>Here is a copy of your message:</p><br>
				<p>Name: ${name}.</p> <p>Email: <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" title="${email}">${email}</a>.</p> <p>Message: ${message}</p>`
	};

	try {

		await transporter.sendMail(messageObject);

	} catch(error) {

		console.error(error);

	}

}