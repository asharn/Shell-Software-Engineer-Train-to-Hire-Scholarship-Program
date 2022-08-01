var getUserById = require('./getUserById');

describe('getUserById', () => {
    it('will return success if the user with user id is found', async() => {
        var userId = 2;
        var result = await getUserById(userId);
        var keys = Object.keys(result);
        expect(result.id).toEqual(2);
        expect(keys).toContain('id');
        expect(keys).toContain('firstName');
        expect(keys).toContain('lastName');

    });

    it('will return an error if the user with userId is not found', async() => {
        var userId = 20;
        await expect(getUserById(userId)).rejects.toEqual(`User with ID ${userId} not found.`);
    });
})