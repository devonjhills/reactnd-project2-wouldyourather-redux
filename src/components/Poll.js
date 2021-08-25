import React from "react";
import { Card } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import PollQuestion from "./PollQuestion";
import PollResults from "./PollResults";

const Poll = () => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const urlId = useParams();

  const question = questions[urlId.id];
  const user = users[question.author];
  const currentUser = users[authedUser];


  const answered = useSelector(
    () => ({
      isAnswered: Object.keys(currentUser.answers).includes(question.id),
    }),
    shallowEqual
  );

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
            {answered.isAnswered ? <PollResults qid={urlId.id} /> : <PollQuestion qid={urlId.id} />}
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Poll;
