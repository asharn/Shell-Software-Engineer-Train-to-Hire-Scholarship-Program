interface QueryParam {
	filename: string;
	width: number;
	height: number;
}

// Checks if all 3 query parameters are present in the URL with valid values
const validateMandatoryParams = (query: QueryParam): boolean => {
	const params: string[] = ['filename', 'width', 'height'];
	const paramsKeys: string[] = Object.keys(query);
	return (
		params.sort().toString() === paramsKeys.sort().toString() &&
		!isNaN(+query.height) &&
		!isNaN(+query.width)
	);
};

export {validateMandatoryParams, QueryParam};
