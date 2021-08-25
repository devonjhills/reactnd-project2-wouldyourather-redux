import React, { Fragment } from "react";
import { Badge, ListGroup, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";

const PollResults = (props) => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const question = questions[props.qid];
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

  return (
    <div>
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
    </div>
  );
};

export default PollResults;
