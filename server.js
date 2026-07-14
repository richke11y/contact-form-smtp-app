import envConfig from './env-config.js';

import nodemailerCreateTransport from './nodemailer/nodemailer-create-transport.js';
import createApp from './app.js';

(async function () {

	console.time('Time');

	const { NODE_ENV, PORT } = envConfig;

	const devENV = NODE_ENV === 'development' ? true : false;

	console.timeLog('Time', `Running ${NODE_ENV} mode. PORT: ${PORT}`);

	try {

		const transporter = await nodemailerCreateTransport();

		await transporter.verify();

		console.timeLog('Time', 'NodeMailer SMTP Verified');

		const app = await createApp(transporter);

		app.listen(PORT, () => {

			if (devENV) {

				console.log(`Listening at http://localhost:${PORT}`);

			} else {

				console.log(`Server listening on ${PORT}`);

			}

		});

	} catch(error) {

		console.timeLog('Time', 'Error Logged');

		console.error('FAILED TO START SERVER', error);

		process.exit(1);

	}

	console.timeEnd('Time');

}());