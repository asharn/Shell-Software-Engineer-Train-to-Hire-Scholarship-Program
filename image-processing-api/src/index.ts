import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes/index';
import {constants} from './utilities/constants';

const app = express();

//Rate limit for each API's to stop D-Dos attack
const limiter = rateLimit({
	windowMs: constants.windowMs, // 1 minute
	max: constants.maxHitPerMinute, // limit each IP to 5 requests per minutes
	message: constants.tooManyRequest,
});

// Middlewares
app.use(morgan(constants.common));
app.use(helmet());
app.use(cors());
app.use(limiter); //  apply to all requests

// Port
const port = constants.port;
app.setMaxListeners(5);
app.listen(port, () => {
	console.log(`Server started at localhost:${port}`);
});

// Routes mapping
app.use(constants.rootPathUrl, routes);

export default app;
