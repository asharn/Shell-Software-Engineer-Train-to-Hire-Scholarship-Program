var users = {
    1: {
        id: 1,
        firstName: 'Kevin',
        lastName: 'Chung'
    },
    2: {
        id: 2,
        firstName: 'Marlon',
        lastName: 'Cobb'
    },
    3: {
        id: 3,
        firstName: 'Maria',
        lastName: 'Santos'
    },
    4: {
        id: 4,
        firstName: 'Iris',
        lastName: 'Leblanc'
    },
    5: {
        id: 5,
        firstName: 'Ali',
        lastName: 'Ahmed'
    }
};

function getUserById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        users[id]
            ? resolve(users[id])
            : reject('User with ID ' + id + ' not found.');
        }, 2000);
    });
}

module.exports = getUserById;