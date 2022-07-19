var multiply = require('./multiply');

describe('multiply', () => {
    it('will return the product of both numbers passed', () => {
        expect(multiply(2, 3)).toEqual(6);
    });
})