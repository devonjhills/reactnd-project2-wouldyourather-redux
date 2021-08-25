import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleSaveQuestion } from "../actions/questions";

const NewQuestion = () => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
      event.preventDefault();
      if (event.target.id === 'optionOneInput') {
        setOptionOneText(event.target.value)
      } else if (event.target.id === 'optionTwoInput') {
        setOptionTwoText(event.target.value)
      }
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      setOptionOneText('');
      setOptionTwoText('');
      dispatch(handleSaveQuestion(optionOneText, optionTwoText));
      history.push("/home")
  }

  const setDisabled = ((optionOneText && optionTwoText) === '');

  return (
    <div style={{ width: "40%", margin: "auto", marginBottom: "5px" }}>
      <Card border="primary">
        <Card.Header className="text-center">Create new Question</Card.Header>
        <Card.Body>
          <Card.Text>Complete the question:</Card.Text>
          <Card.Title>Would you rather ...</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group onChange={handleChange}>
              <Form.Control
                style={{ marginBottom: "10px" }}
                type="text"
                placeholder="Enter Option One Text Here"
                id="optionOneInput"
                
              />
              <Card.Text className="text-center">OR</Card.Text>
              <Form.Control
                style={{ marginBottom: "10px" }}
                type="text"
                placeholder="Enter Option Two Text Here"
                id="optionTwoInput"
                
              />

              <div className="d-grid gap-2">
                <Button variant="outline-primary" type="submit" disabled={setDisabled}>
                  Submit
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewQuestion;
