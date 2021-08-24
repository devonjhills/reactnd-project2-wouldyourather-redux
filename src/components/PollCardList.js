import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PollCardList = (props) => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  const pollId = questions[props.id];
  const author = users[pollId.author];

  const [redirect, setRedirect] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  if (redirect === true) {
    return <Redirect push to={`/questions/${props.id}`} />;
  }

  return (
    <div
      className="text-center"
      style={{ width: "40%", margin: "auto", marginBottom: "5px" }}
    >
      <Card border-variant="dark" bg-variant="dark" text="dark" border="dark">
        <Card.Header style={{ textAlign: "left" }}>
          <Card.Title>
          {author.name} {props.answered ? "asked:" : "asks:"}
          </Card.Title>
        </Card.Header>
        <div className="card-horizontal">
          <Card.Img
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              margin: "auto",
              marginLeft: "10px",
            }}
            src={author && author.avatarURL}
            alt="user avatar"
          ></Card.Img>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              Would you rather
            </Card.Title>
            <Card.Text
              className="text-muted mb-3"
              style={{ textAlign: "center" }}
            >
              {pollId.optionOne.text} ...
            </Card.Text>
            <Card.Text
              className="text-muted mb-3"
              style={{ textAlign: "center" }}
            >
              ...or...
            </Card.Text>
            <Card.Footer>
              <div className="d-grid gap-2">
                {props.answered ? (
                  <Button onClick={handleClick} variant="outline-info">
                    View Results
                  </Button>
                ) : (
                  <Button onClick={handleClick} variant="outline-success">
                    View Poll
                  </Button>
                )}
              </div>
            </Card.Footer>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default PollCardList;
