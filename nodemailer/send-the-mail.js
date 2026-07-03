//nodemailer.com/
//github.com/nodemailer/nodemailer

import dotenv from 'dotenv/config';

export default async function sendTheMail(transporter, { name, email, message }) {

	console.log('sendTheMail()');

	const messageObject = {
		from: process.env.EMAIL_FROM,
		replyTo: `"${name}" <${email}>`,
		to: process.env.EMAIL_TO,
		subject: 'New Contact Form Submission',
		text: `Name: ${name}. Email: ${email}. Message: ${message}`,
		html: `<p>Name: ${name}.</p> <p>Email: <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" title="${email}">${email}</a>.</p> <p>Message: ${message}</p>`
	}

	try {

		await transporter.sendMail(messageObject);

		// const info = await transporter.sendMail(messageObject);
		// console.log(info);

		return { 
			success: true,
			message: 'Thank you for getting in touch. We will get back to you as soon as possible.'
		};

	} catch(error) {

		console.error(error);

		return { 
			success: false, 
			message: error, 
			errors: error 
		};

	}

}