import dotenv from 'dotenv/config';

import nodemailerCreateTransport from './nodemailer/nodemailer-create-transport.js';
import createApp from './app.js';

async function startServer() {

	const devENV = process.env.NODE_ENV === 'development' ? true : false;

	const PORT = process.env.PORT;

	const transporter = await nodemailerCreateTransport();

	await transporter.verify();
	
	console.log('NodeMailer SMTP Verified');

	const app = await createApp(transporter);

	app.listen(PORT, () => {

		if (devENV) {

			console.log(`Listening at http://localhost:${PORT}`)

		} else {

			console.log(`Server listening on port ${PORT}.`)

		}

	});

};

startServer().catch(err => {

	console.error('FAILED TO START SERVER', err);
	process.exit(1);

});