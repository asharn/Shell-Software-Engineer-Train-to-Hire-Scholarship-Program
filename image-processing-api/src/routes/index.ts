import express from 'express';
import {constants} from '../utilities/constants';
import apiRoutes from '../routes/api/index';

const routes = express.Router();

routes.get(constants.rootPathUrl, (req, res) => {
	res.json({
		message: 'Hello Stranger! You are not at right API.',
	});
});

routes.get(constants.checkPathUrl, (req, res) => {
	res.send('Your server is UP and running correctly! :)');
});

routes.use(constants.apiPathUrl, apiRoutes);

export default routes;
