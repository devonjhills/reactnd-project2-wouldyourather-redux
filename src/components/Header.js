import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Header = () => {
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    history.push("/");
    dispatch(setAuthedUser(null));
  };

  return (
    <Navbar
      style={{ paddingLeft: "5px", paddingRight: "5px" }}
      collapseOnSelect
      expand="lg"
      fixed="top"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand eventkey="disabled" disabled>
        Would You Rather?
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" disabled={authedUser === null}>
            <Button variant="outline-light" disabled={authedUser === null}>
              Home
            </Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/add" disabled={authedUser === null}>
            <Button variant="outline-light" disabled={authedUser === null}>
              New Question
            </Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/leaderboard" disabled={authedUser === null}>
            <Button variant="outline-light" disabled={authedUser === null}>
              Leaderboard
            </Button>
          </Nav.Link>
        </Nav>
        {authedUser && (
          <Nav>
            <Navbar.Text>
              Hello, {users[authedUser].name}
              <img
                className="userimg"
                src={users[authedUser].avatarURL}
                alt="User Avatar"
              />
            </Navbar.Text>
            <Navbar.Text>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Navbar.Text>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
