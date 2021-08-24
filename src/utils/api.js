/**
 * Mirrors same structure of api calls as used in the Reactnd Udacity Chirper App
 */
import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from "./_DATA";

/* Source from _DATA.js:

export function _getUsers () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...users}), 1000)
    })
  }
  
  export function _getQuestions () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...questions}), 1000)
    })
  }
*/
export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions()])
        .then(([users, questions]) => ({
            users,
            questions,
        }));
}

/* Source from _DATA.js:

  export function _saveQuestion (question) {
    return new Promise((res, rej) => {
      const authedUser = question.author;
      const formattedQuestion = formatQuestion(question);

      ........
*/
export function saveQuestion(question) {
    return _saveQuestion(question);
}

/* Source from _DATA.js:

  export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
    return new Promise((res, rej) => {

      ........
*/
export function saveQuestionAnswer(answerInfo) {
    return _saveQuestionAnswer(answerInfo);
}
