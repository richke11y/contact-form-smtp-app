//nodemailer.com/
//github.com/nodemailer/nodemailer

import nodemailer from 'nodemailer';
import dotenv from 'dotenv/config';

export default function nodemailerCreateTransport() {

	console.log('nodemailerCreateTransport()');

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	});

	return transporter;

}