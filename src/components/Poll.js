import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/questions";

const Poll = (props) => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const [selectedOption, setSelectedOption] = useState("");

  const urlId = useParams();

  const dispatch = useDispatch();

  const question = questions[urlId.id];
  const user = users[question.author];

  const disableSubmit = selectedOption === "" ? true : false;

  const onFormSubmit = (event) => {
    event.preventDefault();
    let authed = authedUser;
    dispatch(handleSaveQuestionAnswer(authed, question.id, selectedOption));
  };

  const onFormChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="text-center" style={{ width: "40%", margin: "auto" }}>
      <Card text="success" border="success">
        <Card.Header style={{ textAlign: "left" }}>
          <Card.Title>{user.name} asks:</Card.Title>
        </Card.Header>
        <div className="card-horizontal">
          <Card.Img
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              margin: "auto",
              padding: "5px",
            }}
            src={user && user.avatarURL}
            alt="user avatar"
          ></Card.Img>
          <Card.Body>
            <Card.Title style={{ textAlign: "left" }}>
              Would you rather ...
            </Card.Title>
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
                  <Button
                    type="submit"
                    variant="success"
                    disabled={disableSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </Card.Footer>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Poll;
