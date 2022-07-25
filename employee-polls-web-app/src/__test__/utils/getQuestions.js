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

  let questions = {
    "test-user-id-one": {
      id: 'test-user-id-one',
      author: 'test-user-id-one',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['test-user-id'],
        text: 'Build our new application with Javascript',
      },
      optionTwo: {
        votes: ['test-user-id-one'],
        text: 'Build our new application with Typescript'
      }
    },
    "test-user-id-two": {
      id: 'test-user-id-two',
      author: 'test-user-id',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'hire more frontend developers',
      },
      optionTwo: {
        votes: ['test-user-id', 'test-user-id-one'],
        text: 'hire more backend developers'
      }
    },
    "test-user-id-three": {
      id: 'test-user-id-three',
      author: 'test-user-id-one',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: 'conduct a release retrospective 1 week after a release',
      },
      optionTwo: {
        votes: ['test-user-id-one'],
        text: 'conduct release retrospectives quarterly'
      }
    },
    "test-user-id-four": {
      id: 'test-user-id-four',
      author: 'test-user-id',
      timestamp: 1482579767190,
      optionOne: {
        votes: [],
        text: 'have code reviews conducted by peers',
      },
      optionTwo: {
        votes: ['test-user-id-one'],
        text: 'have code reviews conducted by managers'
      }
    }
  }

  export function getTestQuestions () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...questions}), 1000)
    })
  }