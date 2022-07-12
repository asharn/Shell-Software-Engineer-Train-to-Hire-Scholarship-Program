import {validateMandatoryParams, QueryParam} from '../../utilities/validation';

describe('Test validation of query params', () => {
	it('call method validateMandatoryParams and validate all three mandatory param.', () => {
		const queryParam = {} as QueryParam;
		queryParam.filename = 'image';
		queryParam.height = 200;
		queryParam.width = 200;
		expect(validateMandatoryParams(queryParam)).toBeTrue();
	});
	it('call method validateMandatoryParams and validate height missing param.', () => {
		const queryParam = {} as QueryParam;
		queryParam.filename = 'image';
		queryParam.width = 200;
		expect(validateMandatoryParams(queryParam)).toBeFalse();
	});
	it('call method validateMandatoryParams and validate width missing param.', () => {
		const queryParam = {} as QueryParam;
		queryParam.filename = 'image';
		queryParam.height = 200;
		expect(validateMandatoryParams(queryParam)).toBeFalse();
	});
	it('call method validateMandatoryParams and validate filename missing param.', () => {
		const queryParam = {} as QueryParam;
		queryParam.width = 200;
		queryParam.height = 200;
		expect(validateMandatoryParams(queryParam)).toBeFalse();
	});
	it('call method validateMandatoryParams and validate width height as NaN.', () => {
		const queryParam = {} as QueryParam;
		queryParam.filename = 'image';
		queryParam.height = 'X20' as unknown as number;
		queryParam.width = '200' as unknown as number;
		expect(validateMandatoryParams(queryParam)).toBeFalse();
	});
	it('call method validateMandatoryParams and validate width param as NaN.', () => {
		const queryParam = {} as QueryParam;
		queryParam.filename = 'image';
		queryParam.height = 200;
		queryParam.width = 'X20' as unknown as number;
		expect(validateMandatoryParams(queryParam)).toBeFalse();
	});
});
