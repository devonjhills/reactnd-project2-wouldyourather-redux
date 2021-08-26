import { hideLoading, showLoading } from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { ADD_ANSWER, ADD_QUESTION, RECEIVE_QUESTIONS } from "./types";

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

const addAnswer = (authedUser, qid, answer) => {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  };
};

export function handleSaveQuestion(optionOne, optionTwo) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    const question = await saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    });
    dispatch(addQuestion(question));
    return dispatch(hideLoading());
  };
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
  console.log("handleSaveQuestionAnswer", authedUser, qid, answer);
  return async (dispatch) => {
    dispatch(showLoading());

    await saveQuestionAnswer({ authedUser, qid, answer });
    dispatch(addAnswer(authedUser, qid, answer));
    return dispatch(hideLoading());
  };
}
