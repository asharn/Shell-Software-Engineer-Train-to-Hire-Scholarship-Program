const users = {
    'test-user-id': {
      id: 'test-user-id',
      password:'test-pass',
      name: 'Test User',
      avatarURL: '/avatars/test-user-id.jpg',
      answers: {
        "test-question-id-one": 'optionOne'
      },
      questions: ['test-question-id-two']
    },
    'test-user-id-one': {
        id: 'test-user-id-one',
        password:'test-pass',
        name: 'Test User',
        avatarURL: '/avatars/test-user-id.jpg',
        answers: {
          "test-question-id-two": 'optionOne'
        },
        questions: ['test-question-id-three']
      }
  }

  export function getTestUsers () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...users}), 1000)
    })
  }