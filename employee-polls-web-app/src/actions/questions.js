import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actions/users';

// export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
// export const ADD_QUESTION = "ADD_QUESTION";
// export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";


// function addQuestion(question) {
//   return {
//     type: ADD_QUESTION,
//     question,
//   };
// }

// function addQuestionAnswer(authedUser, qid, answer) {
//   return {
//     type: ADD_QUESTION_ANSWER,
//     author: authedUser, 
//     qid, 
//     answer,
//   };
// }

// export function handleAddQuestion(optionOne, optionTwo) {
//   return (dispatch, getState) => {
//     const { authedUser } = getState();

//     return saveQuestion({
//       optionOne,
//       optionTwo,
//       author: authedUser,
//     })
//       .then((question) => dispatch(addQuestion(question)));
//   };
// }

// export function handleAddQuestionAnswer(qid, answer) {
//   return (dispatch, getState) => {
//     const { authedUser } = getState();
//     console.log({qid, answer });
//     return saveQuestionAnswer({
//       author: authedUser,
//       qid, 
//       answer,
//     })
//       .then(() => dispatch(addQuestionAnswer( authedUser, qid, answer )));
//   };
// }

// export function receiveQuestions(questions) {
//   return {
//     type: RECEIVE_QUESTIONS,
//     questions,
//   };
// }

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addAnswerToQuestion(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authedUser,
    qid,
    answer
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleSaveQuestion(optionOne, optionTwo, author) {
  return dispatch => {
    return saveQuestion({ optionOne, optionTwo, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}

