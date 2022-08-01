var filterArray = require('./filterArray');

describe('validating filterArray function', () => {
    it('will return null on passing null value', () => {
        expect(filterArray(null)).toBeNull();
    });

    it('will return same array on passing array with elements less than 100', () => {
        expect(filterArray([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
    });

    it('will return filter array on passing array with some elements greater than 100', () => {
        expect(filterArray([50, 75, 100, 125])).not.toContain(125);
    });
})