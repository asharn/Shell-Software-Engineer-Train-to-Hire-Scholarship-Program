interface QueryParam {
	filename: string;
	width: number;
	height: number;
}

// Checks if all 3 query parameters are present in the URL with valid values
const validateMandatoryParams = (query: QueryParam): boolean => {
	const params: string[] = ['filename', 'width', 'height'];
	const paramsKeys: string[] = Object.keys(query);
	console.log('paramsKeys : ', paramsKeys);
	console.log('Is height a Number : ', !isNaN(+query.height));
	console.log('Is width a Number : ', !isNaN(+query.width));
	console.log(
		'Is params matches : ',
		params.sort().toString() === paramsKeys.sort().toString()
	);
	return (
		params.sort().toString() === paramsKeys.sort().toString() &&
		!isNaN(+query.height) &&
		!isNaN(+query.width)
	);
};

export {validateMandatoryParams, QueryParam};
