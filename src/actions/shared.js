import { getInitialData } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";

/**
 * Start "logged out"
 */
const AUTHED_ID = null;

export function handleInitialData() {
  return async (dispatch) => {
    dispatch(showLoading());

    const { users, questions } = await getInitialData();
    dispatch(receiveQuestions(questions));
    dispatch(receiveUsers(users));
    dispatch(setAuthedUser(AUTHED_ID));
    dispatch(hideLoading());
  };
}
