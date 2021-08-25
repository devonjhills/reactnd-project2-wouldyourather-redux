import React, { Fragment, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/questions";

const Poll = () => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const urlId = useParams();
  const dispatch = useDispatch();

  const question = questions[urlId.id];
  const user = users[question.author];
  const currentUser = users[authedUser];
  const userSelection = currentUser.answers[question.id];
  const optionOneVoteCount = question.optionOne.votes.length;
  const optionTwoVoteCount = question.optionTwo.votes.length;
  const percentOptionOne = (
    (optionOneVoteCount / (optionOneVoteCount + optionTwoVoteCount)) *
    100
  ).toFixed(2);
  const percentOptionTwo = (
    (optionTwoVoteCount / (optionOneVoteCount + optionTwoVoteCount)) *
    100
  ).toFixed(2);

  const answered = useSelector(
    () => ({
      isAnswered: Object.keys(currentUser.answers).includes(question.id),
    }),
    shallowEqual
  );

  const [selectedOption, setSelectedOption] = useState("");

  const disableSubmit = selectedOption === "" ? true : false;

  const onFormSubmit = (event) => {
    event.preventDefault();
    let authed = authedUser;
    dispatch(handleSaveQuestionAnswer(authed, question.id, selectedOption));
  };

  const onFormChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const PollQuestion = () => {
    return (
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
    );
  };

  const PollResults = () => {
    return (
      <Fragment>
        <ListGroup style={{ marginBottom: "15px" }}>
          <ListGroup.Item
            variant={userSelection === "optionOne" ? "success" : "secondary"}
            style={{ textAlign: "left" }}
          >
            {question.optionOne.text}
            {userSelection === "optionOne" && (
              <Badge
                style={{ fontSize: "1em", float: "right" }}
                pill
                bg="success"
              >
                Your Vote
              </Badge>
            )}
          </ListGroup.Item>
          <ProgressBar
            variant="primary"
            now={percentOptionOne}
            label={`${percentOptionOne}%`}
          />
          <ListGroup.Item>
            {optionOneVoteCount} out of{" "}
            {optionOneVoteCount + optionTwoVoteCount} votes
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          <ListGroup.Item
            variant={userSelection === "optionTwo" ? "success" : "secondary"}
            style={{ textAlign: "left" }}
          >
            {question.optionTwo.text}
            {userSelection === "optionTwo" && (
              <Badge
                style={{ fontSize: "1em", float: "right" }}
                pill
                bg="success"
              >
                Your Vote
              </Badge>
            )}
          </ListGroup.Item>

          <ProgressBar
            variant="primary"
            now={percentOptionTwo}
            label={`${percentOptionTwo}%`}
          />
          <ListGroup.Item>
            {optionTwoVoteCount} out of{" "}
            {optionOneVoteCount + optionTwoVoteCount} votes
          </ListGroup.Item>
        </ListGroup>
      </Fragment>
    );
  };

  return (
    <div className="text-center" style={{ width: "40%", margin: "auto" }}>
      <Card border="secondary">
        <Card.Header style={{ textAlign: "left" }}>
          <Card.Title>
            {user.name} {answered.isAnswered ? "asked:" : "asks:"}
          </Card.Title>
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
            {answered.isAnswered ? <PollResults /> : <PollQuestion />}
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Poll;
