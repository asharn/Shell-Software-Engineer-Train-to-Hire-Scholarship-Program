import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { handleAddQuestion, handleAddQuestionAnswer } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function addQuestionToUser({ id }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id
  };
}

function addAnswerToUser(qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    qid,
    answer
  };
}


export function handleSaveQuestionAnswerToUser(qid, answer) {
  return dispatch => {
    dispatch(addQuestionToUser(qid));
    dispatch(addAnswerToUser(qid, answer));

    return saveQuestionAnswer(qid, answer).catch(e => {
      console.error('Error while saving handleSaveQuestionAnswer:', e);
    });
  };
}

