import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
	res.json({
		message: 'Hello Stranger! You are not at right API.',
	});
});

routes.get('/route', (req, res) => {
	res.send('Hello, You called, api route!');
});

export default routes;
