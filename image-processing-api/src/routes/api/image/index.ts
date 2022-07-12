import express from 'express';
import {constants} from '../../../utilities/constants';
import fs from 'fs';
import path from 'path';
import {
	validateMandatoryParams,
	QueryParam,
} from '../../../utilities/validation';
import sharp from 'sharp';
import {promises as fsPromises} from 'fs';

const routes = express.Router();

const imageTransform = async (
	filename: string,
	width: number,
	height: number
): Promise<string> => {
	const imageInput: string =
		path.join(
			__dirname,
			'../',
			'../',
			'../',
			'../',
			'assets/',
			'images/',
			'input-files/',
			filename
		) + '.jpg';
	const imageOutputFolder: string = path.join(
		__dirname,
		'../',
		'../',
		'../',
		'../',
		'assets/',
		'images/',
		'output-files/'
	);
	const imageOutput: string =
		path.join(
			__dirname,
			'../',
			'../',
			'../',
			'../',
			'assets/',
			'images/',
			'output-files/',
			filename
		) + `-${width}-${height}.jpg`;

	// if the image output folder doesn't exists, create it
	if (!fs.existsSync(imageOutputFolder)) {
		await fsPromises.mkdir(imageOutputFolder);
	}

	try {
		// await for sharp to process the image, if it succeds, returns the imageOutput
		await sharp(imageInput).resize(width, height).toFile(imageOutput);
		return imageOutput;
	} catch (error) {
		// if not, returns the error
		return 'Error processing requested file.';
	}
};

routes.get(
	constants.rootPathUrl,
	async (req: express.Request, res: express.Response): Promise<void> => {
		// check if all 3 mandatory parameters are present and width and height are numbers
		if (validateMandatoryParams(req.query as unknown as QueryParam)) {
			// set each parameter to a variable
			const filename = req.query.filename as string;
			const width = Number(req.query.width);
			const height = Number(req.query.height);

			const outputImage: string =
				path.join(
					__dirname,
					'../',
					'../',
					'../',
					'../',
					'assets/',
					'images/',
					'output-files/',
					filename
				) + `-${width}-${height}.jpg`;
			// check if the requested image with the requested size already exists in the disk
			if (fs.existsSync(outputImage)) {
				// if it does, then fetch and sent to client
				res.sendFile(outputImage);
			} else {
				// if it doesn't, then resize the image, save and then sent to client
				const imgProcessed = await imageTransform(
					filename as string,
					width,
					height
				);
				// if the response doesn't include the word "Error", then it has been properly processed, send the processed image as response
				if (!String(imgProcessed).includes('Error')) {
					res.sendFile(imgProcessed);
				} else {
					// if the response includes the word "Error", send a proper error message
					res
						.status(404)
						.send(
							'There is no such image file exist, please verify the file name.'
						);
				}
			}
		} else {
			// if one of the parameters is missing in the request URL or if width or height are not numbers, then send a proper error message
			res
				.status(500)
				.send(
					'Please add a filename, width and height as parameters in the url (all 3 are mandatory and width and height must be numbers).'
				);
		}
	}
);

export default routes;
