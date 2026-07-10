import dotenv from 'dotenv/config';

const envConfig = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: parseInt(process.env.PORT, 10),
	CORS_ORIGIN: process.env.CORS_ORIGIN,
	RATE_LIMIT_LIMIT: parseInt(process.env.RATE_LIMIT_LIMIT, 10),
	RATE_LIMIT_WINDOWMS: parseInt(process.env.RATE_LIMIT_WINDOWMS, 10),
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PORT: parseInt(process.env.SMTP_PORT, 10),
	SMTP_SECURE: process.env.SMTP_SECURE,
	SMTP_PASS: process.env.SMTP_PASS,
	EMAIL_FROM: process.env.EMAIL_FROM,
	EMAIL_TO: process.env.EMAIL_TO
};

if (isNaN(envConfig.PORT) || envConfig.PORT <= 0 || envConfig > 9999) {

	throw new Error('Invalid environment variable: DB_PORT must be a valid port number.');

}

if (isNaN(envConfig.RATE_LIMIT_LIMIT)) {

	throw new Error('Invalid environment variable: RATE_LIMIT_LIMIT must be a valid number');

}

if (isNaN(envConfig.RATE_LIMIT_WINDOWMS)) {

	throw new Error('Invalid environment variable: RATE_LIMIT_WINDOWMS must be a valid number');

}

if (isNaN(envConfig.SMTP_PORT)) {

	throw new Error('Invalid environment variable: SMTP_PORT must be a valid number');

}

export default Object.freeze(envConfig);