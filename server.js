import envConfig from './env-config.js';

import nodemailerCreateTransport from './nodemailer/nodemailer-create-transport.js';
import createApp from './app.js';

async function startServer() {

	const { NODE_ENV, PORT } = envConfig;

	const devENV = NODE_ENV === 'development' ? true : false;

	console.log(`Running in ${NODE_ENV} mode`);
	console.log(`PORT: ${PORT}`);

	try {

		const transporter = await nodemailerCreateTransport();

		console.time('verify');
		await transporter.verify();
		console.timeEnd('verify');
		
		console.log('NodeMailer SMTP Verified');

		const app = await createApp(transporter);

		app.listen(PORT, () => {

			if (devENV) {

				console.log(`Listening at http://localhost:${PORT}`)

			} else {

				console.log(`Server listening on port ${PORT}`)

			}

		});

	} catch(error) {

		console.error('FAILED TO START SERVER', error);
		process.exit(1);

	}

};

startServer();