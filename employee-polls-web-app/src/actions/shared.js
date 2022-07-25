import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
    });
  };
}