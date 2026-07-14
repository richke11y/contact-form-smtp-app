export default function honeypot(req, res, next) {

	const { foobar = null } = req.body;

	if (typeof foobar === 'string' && foobar.trim() !== '') {

		return res.status(400).send('Invalid submission');

	}

	next();

}