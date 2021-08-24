import { hideLoading, showLoading } from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

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

const addAnswer = ({ qid, answer, authedUser }) => {
  return {
    type: ADD_ANSWER,
    answerInfo: {
      qid,
      answer,
      authedUser,
    },
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

export function handleSaveQuestionAnswer(qid, answer) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    await saveQuestionAnswer({
      qid,
      answer,
      authedUser,
    });
    dispatch(
      addAnswer({
        qid,
        answer,
        authedUser,
      })
    );
    return dispatch(hideLoading());
  };
}
