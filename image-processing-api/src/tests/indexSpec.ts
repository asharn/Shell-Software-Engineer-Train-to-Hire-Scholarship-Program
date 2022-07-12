
import { AddressInfo } from 'net';
import mainIndex from '../index'
import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
const request = supertest(mainIndex);

  describe('Test image processing', () => {
	const filename = 'santamonica';
	const width = '300';
	const height = '300';
	const outputPath =
	  path.join(__dirname, '../', '../', 'assets/','images/', 'output-files/', filename) +
	  `-${width}-${height}.jpg`;
  
	it('resizes an image when proper parameters are set in the url', async () => {
	  await request.get(
		`/api/image?filename=${filename}&width=${width}&height=${height}`
	  );
	  expect(fs.existsSync(outputPath)).toBeTrue();
	});
  
	it('returns a proper error message when the image to be processed does not exist', async () => {
	  const response = await request.get(
		`/api/image?filename=test&width=${width}&height=${height}`
	  );
	  expect(response.text).toBe(
		'There is no such image file exist, please verify the file name.'
	  );
	});
  
	it('returns a proper error message when one of the url parameters is not set', async () => {
	  const response = await request.get(
		`/api/image?filename=${filename}&width=${width}`
	  );
	  expect(response.text).toBe(
		'Please add a filename, width and height as parameters in the url (all 3 are mandatory and width and height must be numbers).'
	  );
	});
	it('returns a proper error message if width or height are not numbers', async () => {
	  const response = await request.get(
		`/api/image?filename=${filename}&width=${width}&height=test`
	  );
	  expect(response.text).toBe(
		'Please add a filename, width and height as parameters in the url (all 3 are mandatory and width and height must be numbers).'
	  );
	});
  });
  
  

describe('Test express related configutration', () => {
	it('gets max listeners configured to express app.', () => {
		expect(mainIndex.getMaxListeners()).toEqual(5);
	});
	it('app is listening to localhost:port.', () => {
		expect(mainIndex.listen().listening).toBeTrue;
	});
	it('app is listening to port other than 0.', () => {
		expect((mainIndex.listen().address() as AddressInfo).port).toBeGreaterThan(0);
	});
});
