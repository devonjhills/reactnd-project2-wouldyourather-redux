import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/questions";

const PollQuestion = (props) => {
  const [selectedOption, setSelectedOption] = useState("");

  const questions = useSelector((state) => state.questions);
  const authedUser = useSelector((state) => state.authedUser);
  const question = questions[props.qid];

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(handleSaveQuestionAnswer(authedUser, question.id, selectedOption));
  };

  const onFormChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const disableSubmit = selectedOption === "" ? true : false;

  return (
    <div>
      <Form onChange={onFormChange} onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" style={{ textAlign: "left" }}>
          <Form.Check
            type="radio"
            label={question.optionOne.text}
            id="formRadios1"
            name="formRadios"
            value="optionOne"
          />
          <Form.Check
            type="radio"
            label={question.optionTwo.text}
            id="formRadios2"
            name="formRadios"
            value="optionTwo"
          />
        </Form.Group>
        <Card.Footer>
          <div className="d-grid gap-2">
            <Button type="submit" variant="success" disabled={disableSubmit}>
              Submit
            </Button>
          </div>
        </Card.Footer>
      </Form>
    </div>
  );
};

export default PollQuestion;
