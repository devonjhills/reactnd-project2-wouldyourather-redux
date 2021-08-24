import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Login = () => {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(setAuthedUser(selectedUser));
  };

  const onFormChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const disableSubmit = (selectedUser === "" ? true : false);

  console.log('rendering login');

  return (
    <Card
      className="text-center"
      border="success"
      style={{ margin: "auto", width: "50%" }}
    >
      <Card.Header>
        <Card.Title>Welcome to the Would You Rather App!</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Please sign in to continue.
        </Card.Subtitle>
      </Card.Header>
      <Image
        src="/loginimage.jpg"
        roundedCircle
        style={{ margin: "auto", width: "50%" }}
      />
      <Form onSubmit={onFormSubmit}>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <Form.Group controlId="formBasicSelect">
              <Form.Select onChange={onFormChange}>
                <option key="blankChoice" hidden value="">
                  {" "}
                  Select User...{" "}
                </option>
                {Object.values(users).map((user) => {
                  return (
                    <option key={user.id} value={user.id} >
                      {user.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <div className="d-grid gap-2">
              <Button variant="success" type="submit" disabled={disableSubmit}>
                Sign In
              </Button>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Form>
      <Card.Footer className="mb-2 text-muted">
        <a href="https://www.freepik.com/vectors/question">
          Image sourced from freepik
        </a>
      </Card.Footer>
    </Card>
  );
};

export default Login;
