import express from 'express';
import {constants} from '../../utilities/constants';
import imageRoutes from '../../routes/api/image/index';

const routes = express.Router();

routes.get(constants.rootPathUrl, (req, res) => {
	res.send('You have called api url! :)');
});

routes.use(constants.imagePathUrl, imageRoutes);

export default routes;
