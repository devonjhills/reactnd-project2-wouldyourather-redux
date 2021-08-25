import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Leaderboard = () => {
  const leaders = useSelector(
    (state) => ({
      rank: Object.keys(state.users)
        .sort(
          (a, b) =>
            state.users[b].questions.length +
            Object.keys(state.users[b].answers).length -
            (state.users[a].questions.length +
              Object.keys(state.users[a].answers).length)
        )
        .map((user) => state.users[user]),
    }),
    shallowEqual
  );

  return leaders.rank.map((user) => (
    <div
      key={user.id}
      style={{ width: "40%", margin: "auto", marginBottom: "5px" }}
    >
      <Card bg="light" text="dark" border="dark">
        <div className="card-horizontal">
          <Card.Img
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              margin: "auto",
              padding: "10px",
            }}
            src={user.avatarURL}
            alt="user avatar"
          />
          <Card.Body>
            <Row>
              <Col sm={8}>
                <Card.Title style={{ marginBottom: "20px" }}>
                  {user.name}
                </Card.Title>

                <Row style={{ marginBottom: "10px" }}>
                  <Col sm={8}>Answered questions</Col>
                  <Col style={{ textAlign: "right" }}>
                    {Object.keys(user.answers).length}
                  </Col>
                </Row>
                <Row style={{ marginTop: "10px" }}>
                  <Col sm={8}>Created questions</Col>
                  <Col style={{ textAlign: "right" }}>
                    {user.questions.length}
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <Card style={{ textAlign: "center" }} border="success" text="dark">
                  <Card.Header>
                    SCORE
                  </Card.Header>
                  <Card.Body>
                    <Badge bg="success" style={{fontSize: "2em", borderRadius: "50%"}}>
                      {Object.keys(user.answers).length + user.questions.length}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </div>
      </Card>
    </div>
  ));
};

export default Leaderboard;
