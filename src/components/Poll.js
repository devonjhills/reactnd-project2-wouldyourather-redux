import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Poll = (props) => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  const urlId = useParams();

  const question = questions[urlId.id];
  const user = users[question.author];

  const handleClick = (e) => {
    e.preventDefault();
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
            <Form>
              <Form.Group className="mb-3" style={{ textAlign: "left" }}>
                <Form.Check
                  type="radio"
                  label={question.optionOne.text}
                  id="formRadios1"
                  name="formRadios"
                />
                <Form.Check
                  type="radio"
                  label={question.optionTwo.text}
                  id="formRadios2"
                  name="formRadios"
                />
              </Form.Group>
            </Form>
            <Card.Footer>
              <div className="d-grid gap-2">
                <Button onClick={handleClick} variant="success">
                  Submit
                </Button>
              </div>
            </Card.Footer>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Poll;
