//nodemailer.com/
//github.com/nodemailer/nodemailer
import nodemailer from 'nodemailer';
import envConfig from '../env-config.js';

export default function nodemailerCreateTransport() {

	console.log('nodemailerCreateTransport()');

	const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = envConfig

	const transporter = nodemailer.createTransport({
		pool: true,
		host: SMTP_HOST,
		port: SMTP_PORT,
		secure: false,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS
		}
	});

	return transporter;

}